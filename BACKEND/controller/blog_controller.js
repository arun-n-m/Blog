import { blog_model } from "../model/blog_model.js";
import { user_model } from "../model/user_model.js";
import { comment_model } from "../model/comment_model.js";
import { replay_model } from "../model/replay_model.js";
import { current_user } from "./user_controller.js";

export const getHome = async (req, res) => {
    console.log("getHome");
    try {
        let blogs = await blog_model.find({}).populate({
            path: "blog_comments",
            model: "comments",
            populate: {
                path: "comment_replays",
                model: "replays"
            }
        }).populate({
            path: "authors",
            model: "users"
        }).lean({}).then((data) => {
            return data
        })
        // console.log("blogs.author",blogs.authors);  
        if (blogs.length == 0) {
            res.json({ msg: "There is no blogs!pleace add a new blog." })
        }
        if (blogs.length != 0) {
            res.json({ data: blogs, msg: "success" })
        }
    }
    catch (error) {
        console.error("Error fetching blog home:", error);
        res.status(500).json({ msg: "Error fetching blog home", error });
    }

}

export const postCreation = async (req, res) => {
    console.log("postCreation");

    const { title, content, category } = req.body
    let img = req.file
    const blog_creation = new blog_model({
        title: title,
        body: content,
        image: img.buffer,
        extention: img.mimetype,
        authors: current_user._id,
        category: category,
        likes: [],
        blog_comments: []
    })
    await blog_creation.save()
    console.log("blog_creation", blog_creation);

    let blog = await blog_model.findOne({ title: title }).lean({}).then((data) => {
        return data;
    })
    let user = await user_model.findOne({ email: current_user.email }).lean({})
    await user_model.findByIdAndUpdate(user._id, {
        $push: {
            my_blogs: blog._id
        }
    })
    res.json({ msg: "success" })

}

export const getBlogView = async (req, res) => {
    console.log("viewviewviewviewviewview");
    try {
        const id = req.params.id
        let blogview = await blog_model.findById(id).populate([{
            path: "blog_comments",
            model: "comments",
            populate: [{
                path: "comment_replays",
                model: "replays",
                populate: {
                    path: "replay_users",
                    model: "users",
                }
            },
            {
                path: "comment_users",
                model: "users"
            }]
        }, {
            path: "authors",
            model: "users"
        }]).lean({}).then((data) => {
            // console.log("view", data.comments);
            return data
        })

        let blog_likes = await blog_model.findOne({ _id: id, likes: current_user._id }).lean({}).then((data) => {
            return data
        })
        let like
        if (blog_likes != undefined) {
            like = true
        } else {
            like = false
        }
        res.json({ msg: "success", status: like, data: blogview })

    }
    catch (error) {
        console.error("Error fetching blog view:", error);
        res.status(500).json({ msg: "Error fetching blog view", error });
    }
}



export const getMyblogs = async (req, res) => {
    console.log("getMyblogs works");
    let id=current_user._id
    let blogs = await blog_model.find({authors:id}).populate({
        path: "blog_comments",
        model: "comments",
        populate: {
            path: "comment_replays",
            model: "replays"
        }
    }).populate({
        path: "authors",
        model: "users"
    }).lean({}).then((data) => {
        return data
    })
    
console.log("getmyblogsssssssssssss", blogs);

if (blogs.length == 0) {
    res.json({ msg: "There is no blogs!pleace add a new blog." })
}
if (blogs.length != 0) {
    res.json({ data: blogs, msg: "success" })
}
}

export const postComment = async (req, res) => {
    console.log("postComment");

    const id = req.params.bid
    const comment = req.body.msg
    console.log("post_Commentsssss");

    console.log("cmnt", comment);

    console.log("comment:::::bid", id);
    if (current_user.length != 0) {
        let comments = new comment_model({
            comment: comment,
            comment_users: current_user,
            comment_replays: []
        })
        await comments.save()

        await blog_model.findByIdAndUpdate(id, {
            $push: { blog_comments: comments._id }
        })
        console.log("comment", comments);
        res.json({ msg: "success" })
    }
    else {
        res.json({ msg: "Please login first!" })
    }
}

export const postReplay = async (req, res) => {
    console.log("replaysssssss");
    const replay = req.body.replays
    let replay_id = req.params.cid
    let replays = new replay_model({
        replay: replay,
        replay_users: current_user
    })
    await replays.save()
    await comment_model.findByIdAndUpdate(replay_id, {
        $push: { comment_replays: replays._id }
    })
    console.log("replayys:", replays);
    res.json({ msg: "success" })
}

export const postLike = async (req, res) => {
    if (current_user.length != 0) {
        const id = req.params.id
        let blog_likes = await blog_model.findOne({ _id: id, likes: current_user._id }).lean({}).then((data) => {

            return data
        })
        if (blog_likes != undefined) {
            await blog_model.findByIdAndUpdate(id, { $pull: { likes: current_user._id } })
            console.log("removed");
        } else {
            await blog_model.findByIdAndUpdate(id, { $push: { likes: current_user._id } })
            console.log("added");
        }
        res.json("like added")
    }
    else {
        res.json("please login first")
    }
}
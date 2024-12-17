import { user_model } from "../model/user_model.js"
let newuser
export let current_user

let userCreation = async (username, email, password, image, ext) => {
    let user = new user_model({
        username: username,
        email: email,
        password: password,
        user_profile: image,
        extention: ext,
        my_blogs: [],
        liked_blogs: []
    })
    newuser = await user.save()
}

export const postSignup = async (req, res) => {
    console.log("postSignup works");
    console.log(req.body);
    
    let img = req.file
    const { username, email, password } = req.body
    let user = await user_model.findOne({ $or: [{ email: email }, { username: username }] }).lean({})
    if (user == undefined) {
        await userCreation(username, email, password, img.buffer, img.mimetype);
        res.json({ msg: "success" })
    }
    else {
        res.json({ msg: "username or email is already taken" })
    }
}


export const postLogin = async (req, res) => {
    console.log("Login works");
    
    console.log(req.body);
    let email = req.body.email
    let password = req.body.password
    
    
    let user = await user_model.findOne({ email: email }).lean()
    current_user = user
    if (user.email == email) {
        if (user.password == password) {
            res.json({ msg: "success" })
        }
        else {
            res.json({ msg: "Invalid password" })
        }
    }
    else {
        res.json({ msg: "user not found" })
    }
}


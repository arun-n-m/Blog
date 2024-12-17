import mongoose, { Schema } from "mongoose";

const blog_schema = new mongoose.Schema({
    title: { type: String },
    body: { type: String },
    image: { type: Buffer },
    extention: { type: String },
    authors: { type: Schema.Types.ObjectId,ref:"users"},
    category: { type: String },
    date: { type: Date, default: Date.now },
    likes: [{ type: Schema.Types.ObjectId, ref: "users" }],
    blog_comments: [{ type: Schema.Types.ObjectId, ref: "comments" }],
})

export const blog_model = mongoose.model("blogs", blog_schema)
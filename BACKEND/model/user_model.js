import mongoose, { Schema } from "mongoose";

const user_schema = new mongoose.Schema({
    username: { type: String },
    email: { type: String },
    password: { type: String },
    user_profile: { type: Buffer },
    extention: { type: String },
    my_blogs: [{ type: Schema.Types.ObjectId, ref: 'blogs' }]
})

export const user_model = mongoose.model("users", user_schema)
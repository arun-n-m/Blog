import mongoose, { Schema } from "mongoose";

//create schema for user

const comment_schema = new mongoose.Schema({
    comment:{type:String},
    comment_users:{type:Schema.Types.ObjectId,ref:"users"},
    comment_replays:[{type:Schema.Types.ObjectId,ref:"replays"}],
    date: { type: Date, default: Date.now },
})

//create user model by passing scema and desired collection name

export const comment_model = mongoose.model("comments", comment_schema)
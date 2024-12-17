import mongoose, { Schema } from "mongoose";

//create schema for user

const replay_schema = new mongoose.Schema({
    replay:{type:String},
    replay_users:{type:Schema.Types.ObjectId,ref:"users"},
    date: { type: Date, default: Date.now },
})

//create user model by passing scema and desired collection name

export const replay_model = mongoose.model("replays", replay_schema)
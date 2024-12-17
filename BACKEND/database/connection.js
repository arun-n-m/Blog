import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
export const MongoDB=()=>{
    mongoose.connect(process.env.CONNECTION_STRING,{dbName:"Blogs"}).then(()=>{
        console.log("DataBase connected successfully");
    }).catch((err)=>{
        console.log("ERORR",err);
    })
}
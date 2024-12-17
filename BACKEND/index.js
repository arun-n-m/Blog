import express from "express";
import bodyParser from "body-parser";
import cors from "cors"
import mainRouter from "./router/router.js"
import { MongoDB } from "./database/connection.js";
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use("/",mainRouter)
MongoDB()
app.listen(4400)
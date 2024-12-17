import express from "express";
const mainRouter = express.Router()
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
import {postLogin,postSignup} from "../controller/user_controller.js";
import {getHome,postCreation,getBlogView,postComment,postReplay,postLike, getMyblogs} from "../controller/blog_controller.js";


mainRouter.post("/signup",upload.single("profile"),postSignup);
mainRouter.post("/login",postLogin);
mainRouter.get("/home",getHome)
mainRouter.post("/creation", upload.single("blog_image"), postCreation)
mainRouter.get("/view/:id", getBlogView)
mainRouter.post("/comment/:bid", postComment)
mainRouter.post("/replay/:cid",postReplay)
mainRouter.post("/like/:id",postLike)
mainRouter.get("/myblogs",getMyblogs)

export default mainRouter;
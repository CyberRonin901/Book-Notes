import { Router } from "express";
import userController from "#controllers/user.controller";

const userRouter = Router();

userRouter.get("/pic", userController.sendProfilePic);

userRouter.get("/logout", userController.logout);

export default userRouter;
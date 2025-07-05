import { Router } from "express";
import authGoogleController from "#controllers/authGoogle.controller";

const authGoogleRoute = Router();

authGoogleRoute.get("/", authGoogleController.authenticate);

authGoogleRoute.get("/callback", authGoogleController.redirect);

export default authGoogleRoute;
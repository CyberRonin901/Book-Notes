import { Router } from "express";
import errorController from "#controllers/error.controller";

const errorRoute = Router();

errorRoute.get("/", errorController);

export default errorRoute;
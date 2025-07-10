import { Router } from "express";
import passport from "passport";

const authGoogleRoute = Router();

authGoogleRoute.get("/", passport.authenticate("google", {
      scope: ["email", "profile"]
   }));

authGoogleRoute.get("/callback", passport.authenticate( 'google', {
      successRedirect: '/',
      failureRedirect: '/login'
   }));

export default authGoogleRoute;
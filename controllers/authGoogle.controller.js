import passport from "passport";

const authenticate = passport.authenticate("google", {
      scope: ["email", "profile"]
   });

const redirect = passport.authenticate( 'google', {
      successRedirect: '/',
      failureRedirect: '/login'
   });

const authGoogleController = {
   authenticate,
   redirect,
}

export default authGoogleController;
import passport from "passport";

const authenticateUser = (req, res, next)=>{
   passport.deserializeUser((user, done) => { // required for vercel (stateless server)
      done(null, user);
   });
   if(req.isUnauthenticated()){
      res.redirect("/login");
      return;
   }
   next();
}

export default authenticateUser;
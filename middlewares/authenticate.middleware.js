const authenticateUser = (req, res, next)=>{
   if(req.isUnauthenticated()){
      console.log("forbidden");
      res.redirect("/login");
      return;
   }
   next();
}

export default authenticateUser;
const authenticateUser = (req, res, next)=>{
   if(req.isUnauthenticated()){
      res.redirect("/login");
      return;
   }
   next();
}

export default authenticateUser;
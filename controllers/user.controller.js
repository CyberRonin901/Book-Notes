import axios from "axios";

const sendProfilePic = (req, res) => {
  if(req.isUnauthenticated()) return;
  axios.get(req.user.picture, {
      responseType: "stream"
    })
    .then(result =>{
      res.setHeader('content-type', result.headers['content-type']);
      result.data.pipe(res);
    })
    .catch(e =>{
      console.log(e);
      res.status(404).send("Image not found");
    });
}

const logout = (req, res)=>{
  req.session.destroy(function(err) {
    if(err){
      console.log(err);
      res.redirect("/error");
    }
  });
  res.redirect("/");
}

const userController = {
   sendProfilePic,
   logout
}

export default userController;
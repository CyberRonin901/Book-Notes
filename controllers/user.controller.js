import axios from "axios";

const sendProfilePic = (req, res) => {
  axios.get(req.user.picture, {
      responseType: "stream"
    })
    .then(result =>{
      res.setHeader('content-type', result.headers['content-type']);
      result.data.pipe(res);
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
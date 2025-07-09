const unknownRoute = (req, res) => {
  res.status(404)
    .render('error.ejs', {
      errorCode: "404", 
      errorMessage: "Page not found"
    });
}

const handleError = (err, req, res, next)=>{
      console.error(err.stack);
      res.status(err.statusCode || 500)
         .render("error.ejs", {
            errorCode: err.statusCode
      });
   }
   

const errors = {
   unknownRoute,
   handleError
}

export default errors;
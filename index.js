import path from "path";
import bodyParser from "body-parser";
import express from "express";
import passport from "passport";

import settings from "#config/settings";
import session from "#middlewares/session.middleware";
import { authGoogleUser } from "#middlewares/passport.middleware";
import authGoogleRoute from "#routes/authGoogle.route";
import booksRoute from "#routes/books.route";
import errorRoute from "#routes/error.route";
import userRouter from "#routes/user.route";

const app = express();

// server config
app.set("view engine", "ejs");
app.set("views", path.join( path.resolve(), "views"));

// default middlewares
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// middlewares
app.use(session); // session/cookie
app.use(passport.initialize());
app.use(passport.session());

passport.use("google", authGoogleUser);
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

// routes
app.get("/", (req, res)=>{
  if(req.isAuthenticated()) res.redirect("/books");
  else res.redirect("/login");
});
app.get("/login", (req, res)=>{
  res.render("login.ejs");
});

app.use("/auth/google", authGoogleRoute);
app.use("/error", errorRoute);
app.use("/user", userRouter);
app.use("/books", booksRoute);

app.listen(settings.PORT, ()=>{
   console.log(`Server running on port: ${settings.PORT}`);
})
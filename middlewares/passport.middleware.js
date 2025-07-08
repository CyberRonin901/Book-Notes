import GoogleStrategy from "passport-google-oauth2";
import settings from "#config/settings";
import { createUserObject } from "#utils/userObject";

const googleStrategy = new GoogleStrategy(
   {
      clientID: settings.GOOGLE_CLIENT_ID,
      clientSecret: settings.GOOGLE_CLIENT_SECRET,
      callbackURL: settings.GOOGLE_CALLBACK_URL,
      userProfileURL: settings.GOOGLE_USER_PROFILE_URL,
      passReqToCallback: true,
   },
   function(req, accessToken, refreshToken, profile, done){
      if(!req.user || req.user.id != profile.sub){
         const user = createUserObject(
            profile.sub, 
            profile.displayName, 
            profile.email, 
            profile.picture
         );
      return done(null, user);
      } else{
         return done(null, req.user);
      }
   }
)

export { googleStrategy }
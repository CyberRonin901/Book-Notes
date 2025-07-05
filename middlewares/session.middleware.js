import settings from "#config/settings";
import PgPool from "#config/postgres.config";
import expressSession from "express-session";
import connectPgSimple from "connect-pg-simple";

const pgSession = new connectPgSimple(expressSession);

const session = expressSession({
   store: new pgSession({
         pool: PgPool,
         tableName: "user_sessions"
      }),
   secret: settings.SESSION_SECRET,
   resave: false,
   saveUninitialized: false,
   cookie:{
         secure: settings.ENV === "dev" ? false : true,
         sameSite: "none",
         Domain: settings.DOMAIN,
         maxAge: 1000*60*60*24*5 // 5 days
      },
});

export default session;


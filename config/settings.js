import dotenv from "dotenv";
dotenv.config();

const ENV = process.env.NODE_ENV;
const PORT = ENV === "dev" ? process.env.DEV_PORT : process.env.PROD_PORT;

const settings = {
   ENV,
   PORT,
   DB_CONNECTION_STRING: process.env.CONNECTION_STRING,
   SESSION_SECRET: process.env.SESSION_SECRET,
   GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
   GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
   GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
   GOOGLE_USER_PROFILE_URL: process.env.GOOGLE_USER_PROFILE_URL,
}

export default settings;
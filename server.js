import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/dbConfig.js";
import authRoute from "./routes/auth.route.js";
import session from "express-session";
import { Strategy } from "passport-facebook";
import passport from "passport";
import { facebookAuth } from "./config/credentials.js";
import userRoute from "./routes/user.route.js";
import User from "./models/User.js";

const app = express();
dotenv.config();
app.set("view engine", "ejs");
app.use(express.json());
app.use(cors());

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "SECRET",
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

passport.use(
  new Strategy(
    {
      clientID: facebookAuth.clientId,
      clientSecret: facebookAuth.clientSecret,
      callbackURL: facebookAuth.callbackURL,
    },
    async function (accessToken, refreshToken, profile, cb) {
      // const userExits = await User.findOne({ fbId: profile.id });
      // if (userExits) return cb(null, "user already exits");
      const createUser = await User.findOneAndUpdate(
        { fbId: profile.id },
        {
          access_token: accessToken,
          fbId: profile.id,
        },
        {
          new: true,
          upsert: true,
        }
      );
      return cb(null, profile);
    }
  )
);

app.use("/", userRoute);

app.use("/api/v1/auth", authRoute);

connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log("Listing");
  });
});

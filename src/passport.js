import passport from "passport";
import GithubStrategy from "passport-github";
import FacebookStrategy from "passport-facebook";
import User from "./models/User";
import {
  githubLoginCallback,
  facebookLoginCallback,
} from "./controllers/userController";
import routes from "./routes";

passport.use(User.createStrategy());

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      // callbackURL: `https://devcenter.heroku.com${routes.githubCallback}`,
      callbackURL: `http://localhost:4000${routes.githubCallback}`,
    },
    githubLoginCallback,
  ),
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FB_ID,
      clientSecret: process.env.FB_SECRET,
      callbackURL: `https://870efd0550b2.ngrok.io${routes.facebookCallback}`,
      profileFields: ["id", "displayName", "photos", "email"],
      scope: ["public_profile", "email"],
    },
    facebookLoginCallback,
  ),
);

// passport.use(
//   new LocalStrategy(
//     {
//       usernameField: "username",
//       passwordField: "password",
//       passReqToCallback: true,
//     },
//     function (req, username, password, done) {
//       if (username === "user001" && password === "password") {
//         console.log("test");
//         return done(null, {
//           user_id: username,
//         });
//       } else {
//         console.log("test22");
//         return done(false, null);
//       }
//     },
//   ),
// );

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

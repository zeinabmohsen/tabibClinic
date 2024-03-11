// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const passport = require("passport");
// const User = require("./src/api/models/user.model");

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "/auth/google/callback",
//       scope: ["profile", "email"],
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       const user = await User.findOne({ email: profile.emails[0].value });
//       if (!user) {
//         const newUser = await User.create({
//           firstName: profile.name.givenName,
//           lastName: profile.name.familyName,
//           email: profile.emails[0].value,
//           avatar: profile.photos[0].value,
//           googleId: profile.id,
//         });
//         return done(null, newUser);
//       }

//       console.log(profile);
//       return done(null, profile);
//     }
//   )
// );

// passport.serializeUser(function (user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function (user, done) {
//   done(null, user);
// });

let passport = require("passport");
const User = require("../models/User");
const UserProfile = require("../models/UserProfile");

const LocalStrategy = require("passport-local").Strategy;

// Serialize function
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// exports.getUserProfile = (req, res)=>{
//   UserProfile.exists({ user: req.user._id }, function (err, userProfile) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("Result :", userProfile); // false
//       if (userProfile === null) {
//         console.log("not exist");
//         const userProfile = null;
//         req.session.userProfile = userProfile;
//         console.log(req.session)
//         res.locals.userProfile = userProfile;

//       } else {
//         console.log("exists");
//         UserProfile.findById(userProfile._id.toString())
//         .then((userProfile)=>{
//           req.session.userProfile = userProfile;
//           console.log(req.session)
//           res.locals.userProfile = userProfile;
//         })
//         .catch(err=>{
//           console.log(err);
//         })

//       }
//     }
//   });
//   res.redirect("/");
// }



// Deserialize Function
passport.deserializeUser(function (id, done) {
  UserProfile.exists({ user: id }, function (err, userPro) {
    let userProfile = null;
    if (err) {
      console.log(err);
    } else {
      console.log("Result :", userPro); // false
      if (userPro != null) {
        
        UserProfile.findById(userPro._id.toString())
          .populate("nationality")
          .then((userPro) => {
            userProfile = userPro;
          })

          .catch((err) => {
            console.log(err);
          });
      }
    }
    User.findById(id, function (err, user) {
      user["userProfile"] = userProfile;
      done(err, user);
    });
  });
});

passport.use(
  new LocalStrategy(
    { usernameField: "emailAddress", passwordField: "password" },

    function (emailAddress, password, done) {
      User.findOne({ emailAddress: emailAddress }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        if (!user.verifyPassword(password)) {
          return done(null, false);
        }
        return done(null, user);
      });
    }
  )
);
// Exports

module.exports = passport;

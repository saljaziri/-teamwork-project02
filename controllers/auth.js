const User = require("../models/User");
const bcrypt = require("bcrypt");
const salt = 10;
const roles = require('../helper/rolesConfig');
let passport = require("../helper/ppConfig");
const UserProfile = require("../models/UserProfile");
const { session } = require("../helper/ppConfig");

exports.signup_get = (req, res) => {
  res.render("auth/signup", {roles});
};

exports.signup_post = (req, res) => {
  console.log(req.body);
  let user = new User(req.body);
  let hash = bcrypt.hashSync(req.body.password, salt);

  user.password = hash;
  user
    .save()
    .then(() => {
      res.redirect("/auth/signin");
    })
    .catch((err) => {
      console.log(err);
      res.send("Please try again later.");
    });
};
exports.signin_get = (req, res) => {
  res.render("auth/signin" );
};

exports.signin_post = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/auth/signin",
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
//         console.log(res.locals);
//         console.log(req.session);
//         res.locals.userProfile = userProfile;
//         console.log(res.locals)  
   

//       } else {
//         console.log("exists");
//         UserProfile.findById(userProfile._id.toString())
//         .then((userProfile)=>{
//           console.log(res.locals);
//           console.log(req.session);
//           res.locals.userProfile = userProfile;
//           console.log(res.locals)  
//         })
//         .catch(err=>{
//           console.log(err);
//         })

//       }
//     }
//   });
//   res.redirect("/");
// }

exports.logout_get = (req, res) => {
  req.logout( (err)=> {
    if (err) {
      return next(err);
    }
    res.redirect("/auth/signin");
  });
};

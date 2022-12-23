const User = require("../models/User");
const bcrypt = require("bcrypt");
const salt = 10;
const roles = require("../helper/rolesConfig");
let passport = require("../helper/ppConfig");
const UserProfile = require("../models/UserProfile");
const { session } = require("../helper/ppConfig");
const moment = require("moment");

exports.signup_get = (req, res) => {
  res.render("auth/signup");
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
  res.render("auth/signin");
};

exports.index_get = (req, res) => {
  User.find()
    .then((users) => {
      res.render("auth/index", { users, moment });
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
};

exports.signin_post = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/auth/signin",
});

exports.logout_get = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/auth/signin");
  });
};

exports.show_get = function (req, res) {
  User.findById(req.query.id)
    .then((user) => {
      res.render("auth/detail", { user, moment });
    })
    .catch((err) => {
      console.log(err);
      res.send("Please try again later");
    });
};

exports.edit_get = function (req, res) {
  User.findById(req.query.id)
    .then((user) => {
      res.render("auth/edit", { user, roles });
    })

    .catch((err) => {
      console.log(err);
      res.send("Please try again later");
    });
};

exports.update_put = function (req, res) {
  let user = new User();
user = req.body;
 
  User.findByIdAndUpdate(req.body.id, user)
    .then(() => {
      res.redirect("/auth/index");
    })
    .catch((err) => {
      console.log(err);
      res.send("Please try again later");
    });
};

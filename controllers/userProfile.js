const UserProfile = require("../models/UserProfile");
const User = require("../models/User");
const moment = require("moment");
const nationalities = require("../helper/countriesConfig");
const fs = require("fs");

exports.index_get = (req, res) => {
  UserProfile.find()
    .populate("user")
    .then((userProfiles) => {
      res.render("userProfile/index", { userProfiles, moment });
    })
    .catch((err) => {
      res.send("Please try again later");
    });
};

exports.show_get = function (req, res) {
  UserProfile.findById(req.query.id)
    .populate("user")
    .populate("nationality")
    .then((userProfile) => {
      res.render("userProfile/detail", { userProfile, moment });
    })
    .catch((err) => {
      console.log(err)
      res.send("Please try again later");
    });
};

exports.edit_get = function (req, res) {
  console.log(req.user);
  UserProfile.exists({ user: req.user._id }, function (err, userProfile) {
    if (err) {
      console.log(err);
    } else {
      console.log("Result :", userProfile); // false
      if (userProfile === null) {
        console.log("not exist");
        const userProfile = null;

        res.redirect("/userProfile/add");
      } else {
        console.log("exists");
        console.log(userProfile._id);
        UserProfile.findById(userProfile._id.toString())
          .populate("nationality")
          .populate("user")
          .then((userProfile) => {
            res.render("userProfile/edit", { userProfile, nationalities });
          })

          .catch((err) => {
            console.log(err);
            res.send("Please try again later");
          });
      }
    }
  });
};

exports.update_put = function (req, res) {


  let userProfile = new UserProfile();
  userProfile = req.body;

  if(req.file!=null){
    if(userProfile.userImage!=""){

      let path  =__basedir + "/public/img/" + userProfile.previousUserImage;
      console.log(path)
      fs.unlink(path, (err) => {
        if (err) {
          console.log
        }
    
        
      });
    
    }
    userProfile.userImage = __imagedir + "/" + req.file.filename;
  }
  
  req.session.userProfile = userProfile;
  UserProfile.findByIdAndUpdate(req.body.id, userProfile)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      res.send("Please try again later");
    });
};

exports.create_get = (req, res) => {
  UserProfile.exists({ user: req.user._id }, function (err, userProfile) {
    if (err) {
      console.log(err);
    } else {
      console.log("Result :", userProfile); // false
      if (userProfile != null) {
        console.log("exists");
        res.redirect("/userProfile/edit");
      } else {
        res.render("userProfile/add", { nationalities });
      }
    }
  });
};

exports.create_post = (req, res) => {
  let userProfile = new UserProfile(req.body);
  if (req.file != null) {


    console.log(req.file.filename);
    userProfile.userImage = __imagedir + "/" + req.file.filename;
  }
  req.session.userProfile = userProfile;
  userProfile
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
      res.send("Please try again later");
    });
};

exports.delete_get = (req, res) => {
  console.log(req.query.id);
  UserProfile.findOneAndDelete({ _id: req.params.id })
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      res.send("Please try again later");
    });
};

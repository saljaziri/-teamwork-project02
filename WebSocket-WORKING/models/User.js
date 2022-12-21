const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const roles = require("../helper/rolesConfig");


const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: [3, "Characters must more than 3"],
      maxlength: [20, "Maximum is 20 characters"],
    },

    lastName: {
      type: String,
      required: true,
      minlength: [3, "Characters must more than 3"],
      maxlength: [20, "Maximum is 20 characters"],
    },
    emailAddress: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Password is Week"],
    },
    role: {
      type: String,
      required: true,
      enum : roles,
      default: "user"
    }
  },
  {
    timestamps: true,
  }
);

userSchema.methods.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};


const User = mongoose.model("User", userSchema);

module.exports = User;

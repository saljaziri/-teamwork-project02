const mongoose = require("mongoose");
const nationalities = require("../helper/countriesConfig");



const userProfileSchema = mongoose.Schema(
  {
    userImage: {
      type: String,
      maxlength: [100, "Maximum is 100 characters"],
      default: ''
    },

    favoriteTeam: {
      type: String,
      minlength: [3, "Characters must more than 3"],
      maxlength: [30, "Maximum is 30 characters"],
      default:''
    },
    favoritePlayer: {
      type: String,
      minlength: [3, "Characters must more than 3"],
      maxlength: [30, "Maximum is 30 characters"],
      default: ''
    },
    nationality: {
      type: String,
      required: true,
      enum : nationalities
        },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
  },
  {
    timestamps: true,
  }
);


const UserProfile = mongoose.model("UserProfile", userProfileSchema);

module.exports = UserProfile;

const mongoose = require("mongoose");

const dreamClubRatingSchema = mongoose.Schema(
  {
    like:  Number
    ,
    dislike :  Number
    ,
    
    dreamClub : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DreamClub'
    }],
    user : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
  },{timestamps}
);



const DreamClubRating = mongoose.model("DreamClubRating", dreamClubRatingSchema);

module.exports = DreamClubRating;

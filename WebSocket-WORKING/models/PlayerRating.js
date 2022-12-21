const mongoose = require("mongoose");

const playerRatingSchema = mongoose.Schema(
  {
    rating:  Number
    ,
    player : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    }],
    user : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
  },{timestamps}
);



const PlayerRating = mongoose.model("PlayerRating", playerRatingSchema);

module.exports = PlayerRating;

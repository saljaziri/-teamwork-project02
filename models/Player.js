const mongoose = require('mongoose');
const nationalities = require("../helper/countriesConfig");
const playerPositions = require('../helper/playerPositionsConfig');
const playerSchema = mongoose.Schema({
  playerImage: {
    type: String,
    default: ''
  },
    name: String,
    
    nationality: {
        type: String,
        required: true,
        enum : nationalities,
      },
    
    playerPosition: {
      type: String,
      required: true,
      enum : playerPositions
    },
    kitNumber: String,
    trophies: String,
    user: 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }},
    {timestamps: true

})

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;
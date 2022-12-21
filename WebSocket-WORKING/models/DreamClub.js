const mongoose = require('mongoose');
const playerPositions = require('../helper/playerPositionsConfig');

const dreamClubSchema = mongoose.Schema({
    club:
    {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Club'
        },
        dreamClubImage: {
            type: String,
            default: ''
          },
    player: 
    {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Player'
            },
    kitNumber: String,
    playerPosition: {
        type: String,
        required: true,
        enum : playerPositions
      },
    
    playerVideo: String,
    comment: String,
    user: 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },},
    {timestamps: true

})

const DreamClub = mongoose.model('DreamClub', dreamClubSchema);
module.exports = DreamClub;
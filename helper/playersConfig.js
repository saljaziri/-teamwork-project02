const mongoose = require('mongoose');
const Player = require ('../models/Player');

function players(){
    let playersArray = [];

let getPlayers = Player.find().exec(function(err, players){
    if(err){
        console.log(err);
    }
    players.forEach(element => {
        playersArray.push(element);
    });
});

return playersArray;

}

module.exports = players();
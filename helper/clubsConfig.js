const mongoose = require('mongoose');
const Club = require ('../models/Club');

function clubs(){
    let clubsArray = [];

let getClubs = Club.find().exec(function(err, clubs){
    if(err){
        console.log(err);
    }
    clubs.forEach(element => {
        clubsArray.push(element);
    });
});

return clubsArray;

}

module.exports = clubs();
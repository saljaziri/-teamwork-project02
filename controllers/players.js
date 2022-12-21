const Player = require('../models/Player');
const nationalities = require('../helper/countriesConfig')
const User = require('../models/User');
const moment = require('moment');
const playerPositions = require('../helper/playerPositionsConfig');

exports.player_index_get = (req,res)=>{
    
    // res.render('player/index')
    Player.find().populate("user", "nationality")
    // .populate('Country')
    .then(players =>{
        res.render('player/index', {players, moment});
        
    })
    .catch(err => {
        console.log(err);
    })
}

exports.player_create_get = (req, res) =>{
    // res.render('player/add');
  
      res.render("player/add", { nationalities, playerPositions });
  
}

exports.player_create_post = (req,res) =>{
    console.log(req.body);
    let player = new Player (req.body);
    player.save()
    .then(() =>{
        res.redirect('/player/index');
    })
    .catch((err) =>{
        console.log(err);
        res.send('cannot create the player, try again later');
    })
}

exports.player_detail_get = (req, res) =>{
    console.log(req.query.id);
    Player.findById(req.query.id).populate('user', 'nationality')
    .then(player => {
        res.render('player/detail', {player, moment})
    })
    .catch(err => {
        console.log(err);
    })
}

exports.player_edit_get = (req, res) =>{
    Player.findById(req.query.id)
    .populate('user','nationality')
    .then((player) => {
        res.render('player/edit', {player, nationalities, playerPositions});
    })
    .catch((err) => {
        console.log(err);
        res.send('plaese try again later');
    })
}

exports.player_edit_put = (req, res) =>{
    console.log(req.body.id);
    Player.findByIdAndUpdate(req.body.id, req.body)
    .then(() =>{
        res.redirect('/player/index');
    })
    .catch(err => {
        console.log(err)
        res.send('please try again later')
    });
}

exports.player_delete_get = (req, res) =>{
    console.log(req.query.id);
    Player.findByIdAndDelete(req.query.id)
    .then(() => {
        res.redirect('/player/index');
    })
    .catch(err =>{
        console.log(err);
        res.send('please try again later');
    })
}




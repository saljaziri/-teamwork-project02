const Player = require('../models/Player');
const nationalities = require('../helper/countriesConfig')
const User = require('../models/User');
const moment = require('moment');
const playerPositions = require('../helper/playerPositionsConfig');
imagedir = "playerImage"
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
    if (req.file != null) {

        player.playerImage = imagedir + "/" + req.file.filename;
      }
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
    .populate('user')
    .populate('nationality')
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
    let player = new Player();
    player = req.body;
    if(req.file!=null){
        if(player.playerImage!=""){
    
          let path  =__basedir + "/public/img/" + player.previousPlayerImage;
          console.log(path)
          fs.unlink(path, (err) => {
            if (err) {
              console.log
            }
        
            
          });
        
        }
        player.playerImage = imagedir + "/" + req.file.filename;
      }
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




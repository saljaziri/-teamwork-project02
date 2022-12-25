const DreamClub = require('../models/DreamClub');
const Club = require('../models/Club');
const moment = require('moment');
const User = require('../models/User');
const Player = require('../models/Player');
const playerPositions = require('../helper/playerPositionsConfig');

exports.dreamClub_index_get = (req, res) => {
    DreamClub.find()
    .populate('player')
    .populate('user')
    .populate('club')
    .then(dreamClubs =>{
        res.render('dreamClub/index',{dreamClubs, moment});
    })
    .catch(err =>{
        res.send(err);
    });
}







exports.dreamClub_create_get = (req, res) => {
    Player.find()

    .then((players) => {
        Club.find()

        .then((clubs) => {
            res.render('dreamClub/add', {players, playerPositions, clubs});

        })
        .catch((err) => {
        })
    })
    .catch((err) => {
    });
   
  
   
    }


exports.dreamClub_create_post = (req, res) => {
    let dreamClub = new DreamClub (req.body);
    
    if (req.file != null) {

        dreamClub.dreamClubImage = "dreamClubImage/" + req.file.filename;
      }

    dreamClub.save()
    .then(() =>{
        res.redirect('/dreamClub/index');
    })
    .catch((err) => {
        res.send('please try again later');
    })
}

exports.dreamClub_detail_get = (req, res) => {
    DreamClub.findById(req.query.id)
    .populate('user')
    .populate('club')
    .populate('player')
    .then((dreamClub) => {
        res.render('dreamClub/detail', {dreamClub, moment});
    })
    .catch((err) => {
        res.send('Please try again later');
    })
}

exports.dreamClub_edit_get = (req, res) => {
 
    Player.find()

    .then((players) => {
        Club.find()

        .then((clubs) => {
            DreamClub.findById(req.query.id)
            .populate('user')
            .populate('player')
            .populate('club')
            .then((dreamClub) => {
                res.render('dreamClub/edit', {players, playerPositions, clubs, dreamClub});
                // res.render('dreamClub/edit',{dreamClub });
            })
            .catch((err) => {
                res.send('please try again ater');
            })
        })
        .catch((err) => {
        })
    })
    .catch((err) => {
    });


    
}

exports.dreamClub_edit_put = (req, res) => {
    let dreamClub = new DreamClub();
    dreamClub = req.body;
    if(req.file!=null){
        if(dreamClub.dreamClubImage!=""){
    
          let path  =__basedir + "/public/img/" + dreamClub.previousDreamClubImage;
          fs.unlink(path, (err) => {
            if (err) {
            }
        
            
          });
        
        }
        dreamClub.dreamClubImage = "dreamClubImage/" + req.file.filename;
      }
    DreamClub.findByIdAndUpdate(req.body.id, req.body)
    .then(()=> {
        res.redirect('/dreamClub/index');
    })
    .catch(err =>{
        res.send('please try again later');
    })
}

exports.dreamClub_delete_get = (req, res)=> {
    DreamClub.findByIdAndDelete(req.query.id)
    .then(() => {
        res.redirect('/dreamClub/index')
    })
    .catch(err => {
        res.send('please try again later');
    })
}

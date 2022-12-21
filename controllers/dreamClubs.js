const DreamClub = require('../models/DreamClub');
const Club = require('../models/Club');
const moment = require('moment');
const User = require('../models/User');
const Player = require('../models/Player');
const playerPositions = require('../helper/playerPositionsConfig');
const players = require('../helper/playersConfig');
const clubs = require('../helper/clubsConfig');

exports.dreamClub_index_get = (req, res) => {
    
    DreamClub.find()
    .populate('player')
    .populate('user')
    .populate('club')
    .then(dreamClubs =>{
        res.render('dreamClub/index',{dreamClubs, moment});
    })
    .catch(err =>{
        console.log(err);
        res.send(err);
    });
}


exports.dreamClub_create_get = (req, res) => {

  
    res.render('dreamClub/add', {players, playerPositions, clubs});
   
    }


exports.dreamClub_create_post = (req, res) => {
    console.log(req.body);
    let dreamClub = new DreamClub (req.body);
    console.log(req.file);
    if (req.file != null) {

        console.log('Im here inside');
        console.log("check image "+__imagedir + "/"+req.file.filename);
        dreamClub.clubImage = __imagedir + "/" + req.file.filename;
      }

    dreamClub.save()
    .then(() =>{
        res.redirect('/dreamClub/index');
    })
    .catch((err) => {
        console.log(err);
        res.send('please try again later');
    })
}

exports.dreamClub_detail_get = (req, res) => {
    console.log(req.body.id);
    DreamClub.findById(req.query.id)
    .populate('user')
    .populate('club')
    .populate('player')
    .then((dreamClub) => {
        res.render('dreamClub/detail', {dreamClub, moment});
    })
    .catch((err) => {
        console.log(err);
        res.send('Please try again later');
    })
}

exports.dreamClub_edit_get = (req, res) => {
    DreamClub.findById(req.query.id)
    .populate('user')
    .populate('player')
    .populate('club')
    .then((dreamClub) => {
        res.render('dreamClub/edit', {players, playerPositions, clubs, dreamClub});
        // res.render('dreamClub/edit',{dreamClub });
    })
    .catch((err) => {
        console.log(err);
        res.send('please try again ater');
    })
}

exports.dreamClub_edit_put = (req, res) => {
    DreamClub.findByIdAndUpdate(req.body.id, req.body)
    .then(()=> {
        res.redirect('/dreamClub/index');
    })
    .catch(err =>{
        console.log(err);
        res.send('please try again later');
    })
}

exports.dreamClub_delete_get = (req, res)=> {
    DreamClub.findByIdAndDelete(req.query.id)
    .then(() => {
        res.redirect('/dreamClub/index')
    })
    .catch(err => {
        console.log(err);
        res.send('please try again later');
    })
}

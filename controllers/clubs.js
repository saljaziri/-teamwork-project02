const Club = require('../models/Club');
const User = require('../models/User');
const moment = require('moment');
const nationalities = require('../helper/countriesConfig');
const popularities = require("../helper/popularityConfig");

exports.club_index_get = (req, res) => {
    
    Club.find().populate('user')
    .then(clubs =>{
        res.render('club/index',{clubs, moment});
    })
    .catch(err =>{
        res.send('please try again later');
    });
}
exports.club_create_get = (req, res) => {
    res.render('club/add',{nationalities,popularities });
}

exports.club_create_post = (req, res) => {
    let club = new Club (req.body);
    
    if (req.file != null) {

        
        club.clubImage = "clubImage/" + req.file.filename;
      }

    club.save()
    .then(() =>{
        res.redirect('/club/index');
    })
    .catch((err) => {
        res.send('please try again later');
    })
}


exports.club_detail_get = (req, res) => {
    Club.findById(req.query.id).populate('user')
    .then((club) => {
        res.render('club/detail', {club, moment});
    })
    .catch((err) => {
        res.send('Please try again later');
    })
}

exports.club_edit_get = (req, res) => {
    Club.findById(req.query.id)
    .populate('user')
    .populate('nationality')
    .then((club) => {
        res.render('club/edit',{club, nationalities,popularities });
    })
    .catch((err) => {
        res.send('please try again ater');
    })
}

exports.club_edit_put = (req, res) => {
    let club = new Club();
    club = req.body;
    if(req.file!=null){
        if(club.clubImage!=""){
    
          let path  =__basedir + "/public/img/" + club.previousClubImage;
          fs.unlink(path, (err) => {
            if (err) {
            }
        
            
          });
        
        }
        club.clubImage = "clubImage/" + req.file.filename;
      }
    Club.findByIdAndUpdate(req.body.id, req.body)
    .then(()=> {
        res.redirect('/club/index');
    })
    .catch(err =>{
        res.send('please try again later');
    })
}

exports.club_delete_get = (req, res)=> {
    Club.findByIdAndDelete(req.query.id)
    .then(() => {
        res.redirect('/club/index');
    })
    .catch(err => {
        res.send('please try again later');
    })
}

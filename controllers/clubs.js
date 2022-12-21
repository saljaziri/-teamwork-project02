const Club = require('../models/Club');
const User = require('../models/User');
const moment = require('moment');
const nationalities = require('../helper/countriesConfig');

exports.Club_index_get = (req, res) => {
    
    Club.find().populate('user')
    .then(clubs =>{
        res.render('club/index',{clubs, moment});
    })
    .catch(err =>{
        console.log(err);
        res.send('please try again later');
    });
}
exports.Club_create_get = (req, res) => {
    res.render('club/add',{nationalities});
}

exports.Club_create_post = (req, res) => {
    console.log(req.body);
    let club = new Club (req.body);
    club.save()
    .then(() =>{
        res.redirect('/club/index');
    })
    .catch((err) => {
        console.log(err);
        res.send('please try again later');
    })
}

exports.Club_detail_get = (req, res) => {
    console.log(req.query.id);
    Club.findById(req.query.id).populate('user')
    .then((club) => {
        res.render('Club/detail', {club, moment});
    })
    .catch((err) => {
        console.log(err);
        res.send('Please try again later');
    })
}

exports.Club_edit_get = (req, res) => {
    Club.findById(req.query.id)
    .populate('user','nationality')
    .then((club) => {
        res.render('club/edit',{club, nationalities });
    })
    .catch((err) => {
        console.log(err);
        res.send('please try again ater');
    })
}

exports.Club_edit_put = (req, res) => {
    Club.findByIdAndUpdate(req.body.id, req.body)
    .then(()=> {
        res.redirect('/club/index');
    })
    .catch(err =>{
        console.log(err);
        res.send('please try again later');
    })
}

exports.Club_delete_get = (req, res)=> {
    console.log(req.query.id);
    Club.findByIdAndDelete(req.query.id)
    .then(() => {
        res.redirect('/club/index');
    })
    .catch(err => {
        console.log(err);
        res.send('please try again later');
    })
}

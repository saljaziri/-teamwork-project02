const express = require('express');
const router = express.Router();
router.use(express.urlencoded({extended: true}));
let methodOverride = require('method-override');
router.use(methodOverride('_method'));
const dreamClubControl = require('../controllers/dreamClubs');
const isLoggedIn = require("../helper/isLoggedIn");
const isUserAdmin = require('../helper/isUserAdmin');

const upload = require('../helper/dreamClubImageUploader');

router.get('/dreamClub/index',dreamClubControl.dreamClub_index_get);

router.get('/dreamClub/add',isLoggedIn, dreamClubControl.dreamClub_create_get);
router.post('/dreamClub/add',isLoggedIn,upload.single('dreamClubImageFile'), dreamClubControl.dreamClub_create_post);

router.get('/dreamClub/detail',isLoggedIn, dreamClubControl.dreamClub_detail_get);

router.get('/dreamClub/edit',isLoggedIn, dreamClubControl.dreamClub_edit_get);
router.put('/dreamClub/update',isLoggedIn,upload.single('dreamClubImageFile'), dreamClubControl.dreamClub_edit_put);

router.get('/dreamClub/delete',isLoggedIn,isUserAdmin, dreamClubControl.dreamClub_delete_get);



module.exports = router;
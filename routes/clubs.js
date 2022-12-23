const express = require('express');
const router = express.Router();
router.use(express.urlencoded({extended: true}));
let methodOverride = require('method-override');
router.use(methodOverride('_method'));
const clubControl = require('../controllers/clubs');
const isUserAdmin = require("../helper/isUserAdmin");
const isLoggedIn = require("../helper/isLoggedIn");
const upload = require('../helper/clubImageUploader');
router.get('/club/index', clubControl.club_index_get);

router.get('/club/add',isLoggedIn, clubControl.club_create_get);
router.post('/club/add', isLoggedIn,upload.single('clubImageFile'),clubControl.club_create_post);

router.get('/club/detail',isLoggedIn, clubControl.club_detail_get);

router.get('/club/edit',isLoggedIn, clubControl.club_edit_get);
router.put('/club/update',isLoggedIn,upload.single('clubImageFile'), clubControl.club_edit_put);

router.get('/club/delete', isLoggedIn, isUserAdmin,clubControl.club_delete_get);



module.exports = router;
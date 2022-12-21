const express = require('express');
const router = express.Router();
router.use(express.urlencoded({extended: true}));
let methodOverride = require('method-override');
router.use(methodOverride('_method'));
const dreamClubControl = require('../controllers/dreamClubs');

const isLoggedIn = require("../helper/isLoggedIn");
const upload = require('../helper/imageUploader');
__imagedir = "clubImage";
router.get('/dreamClub/index', dreamClubControl.dreamClub_index_get);

router.get('/dreamClub/add', dreamClubControl.dreamClub_create_get);
router.post('/dreamClub/add',isLoggedIn,upload.single('clubImageFile'), dreamClubControl.dreamClub_create_post);

router.get('/dreamClub/detail', dreamClubControl.dreamClub_detail_get);

router.get('/dreamClub/edit', dreamClubControl.dreamClub_edit_get);
router.put('/dreamClub/update',isLoggedIn,upload.single('clubImageFile'), dreamClubControl.dreamClub_edit_put);

router.get('/dreamClub/delete', dreamClubControl.dreamClub_delete_get);



module.exports = router;
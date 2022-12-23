const express = require('express');
const router = express.Router();
router.use(express.urlencoded({ extended: true }));
let methodOverride = require('method-override');
router.use(methodOverride('_method'));
const playerControl = require('../controllers/players');
const isLoggedIn = require("../helper/isLoggedIn");
const isUserAdmin = require('../helper/isUserAdmin');
const upload = require('../helper/playerImageUploader');

router.get('/player/index', playerControl.player_index_get);
router.get('/player/add',isLoggedIn, playerControl.player_create_get);
router.post('/player/add',isLoggedIn, upload.single('playerImageFile'), playerControl.player_create_post);
router.get('/player/detail',isLoggedIn, playerControl.player_detail_get);
router.get('/player/edit',isLoggedIn, playerControl.player_edit_get);
router.put('/player/update',isLoggedIn ,upload.single('playerImageFile'), playerControl.player_edit_put);
router.get('/player/delete',isLoggedIn,isUserAdmin, playerControl.player_delete_get);




module.exports = router;
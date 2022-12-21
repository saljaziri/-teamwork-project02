const express = require('express');
const router = express.Router();
router.use(express.urlencoded({ extended: true }));
let methodOverride = require('method-override');
router.use(methodOverride('_method'));
const playerControl = require('../controllers/players');

router.get('/player/index', playerControl.player_index_get);
router.get('/player/add', playerControl.player_create_get);
router.post('/player/add', playerControl.player_create_post);
router.get('/player/detail', playerControl.player_detail_get);
router.get('/player/edit', playerControl.player_edit_get);
router.put('/player/update', playerControl.player_edit_put);
router.get('/player/delete', playerControl.player_delete_get);




module.exports = router;
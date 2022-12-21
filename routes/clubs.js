const express = require('express');
const router = express.Router();
router.use(express.urlencoded({extended: true}));
let methodOverride = require('method-override');
router.use(methodOverride('_method'));
const ClubControl = require('../controllers/clubs');

router.get('/Club/index', ClubControl.Club_index_get);

router.get('/club/add', ClubControl.Club_create_get);
router.post('/club/add', ClubControl.Club_create_post);

router.get('/Club/detail', ClubControl.Club_detail_get);

router.get('/Club/edit', ClubControl.Club_edit_get);
router.put('/club/update', ClubControl.Club_edit_put);

router.get('/club/delete', ClubControl.Club_delete_get);



module.exports = router;
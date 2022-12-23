const express = require('express');
const upload = require('../helper/userImageUploader');
const router =  express.Router();

router.use(express.urlencoded({extended: true}));
let methodOverride = require('method-override');

router.use(methodOverride('_method'));
const isLoggedIn = require("../helper/isLoggedIn");

const userProfileController = require('../controllers/userProfile');
const isUserAdmin = require('../helper/isUserAdmin');
router.get('/userProfile/index', isLoggedIn, isUserAdmin, userProfileController.index_get);
router.get('/userProfile/detail', isLoggedIn,userProfileController.show_get);

router.get('/userProfile/edit',isLoggedIn,userProfileController.edit_get);
router.put('/userProfile/update', isLoggedIn,upload.single('userImageFile'),userProfileController.update_put);

router.get('/userProfile/add',isLoggedIn,userProfileController.create_get);
router.post('/userProfile/add',isLoggedIn,upload.single('userImageFile'), userProfileController.create_post);

router.get('/userProfile/delete/:id',isLoggedIn,userProfileController.delete_get);

module.exports = router;
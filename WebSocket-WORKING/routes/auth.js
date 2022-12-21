const router = require('express').Router();
const authController = require("../controllers/auth");
const isLoggedIn = require("../helper/isLoggedIn");
const isUserAdmin = require("../helper/isUserAdmin");


router.get("/auth/signup", authController.signup_get)
router.post("/auth/signup", authController.signup_post)
router.get("/auth/signin",authController.signin_get);
router.post('/auth/signin', authController.signin_post);
router.get("/auth/logout", authController.logout_get);
router.get('/auth/index', isLoggedIn, isUserAdmin, authController.index_get);
router.get('/auth/detail', isLoggedIn, isUserAdmin, authController.show_get);
router.get('/auth/edit', isLoggedIn, isUserAdmin, authController.edit_get);
router.post('/auth/update', isLoggedIn,isUserAdmin,authController.update_put);




module.exports = router;
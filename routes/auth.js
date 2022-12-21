const router = require('express').Router();
const authController = require("../controllers/auth");


router.get("/auth/signup", authController.signup_get)
router.post("/auth/signup", authController.signup_post)
router.get("/auth/signin",authController.signin_get);
router.post('/auth/signin', authController.signin_post);
router.get("/auth/logout", authController.logout_get);


module.exports = router;

const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controller/user.js")

router.route("/login")
.get(userController.renderLogin)
.post(saveRedirectUrl , passport.authenticate("local" , {failureRedirect:'/login' , failureFlash: true}),userController.login)

router.route("/signup")
.get(userController.renderSignUpForm)
.post(wrapAsync(userController.create))

// router.get("/signup",userController.renderSignUpForm);

// router.post("/signup",wrapAsync(userController.create));

// router.get("/login" , userController.renderLogin);

// authenticate user -- using password 
// middleware
// router.post("/login",saveRedirectUrl , passport.authenticate("local" , {failureRedirect:'/login' , failureFlash: true}),userController.login)


router.get("/logout",userController.logout)

// Permissions ---> authorization

module.exports = router;
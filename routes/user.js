const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl, validateUser } = require("../middleware.js");

const userController = require("../controllers/users.js");

router
    .route("/signup")
    // New Route (signup)
    .get(userController.renderSignupForm)
    // Create account route (signup)
    .post(validateUser, wrapAsync(userController.signup));

router
    .route("/login")
    // Login form route
    .get(userController.renderLoginForm)
    // Login post route
    .post(
        saveRedirectUrl,
        passport.authenticate("local", {
            failureRedirect: "/login",
            failureFlash: true,
        }),
        userController.login
    );

// Logout route
router.get("/logout", userController.logout);

module.exports = router;

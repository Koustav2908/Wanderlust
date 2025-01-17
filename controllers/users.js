const User = require("../models/user.js");

// Render signup form
module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
};

// Signup an user
module.exports.signup = async (req, res, next) => {
    try {
        let user = req.body.user;
        const newUser = new User({
            email: user.email,
            username: user.username,
        });
        const registeredUser = await User.register(newUser, user.password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if (err) return next(err);

            req.flash(
                "success",
                "Registration successful. Welcome to Wanderlust!"
            );
            res.redirect("/listings");
        });
    } catch (err) {
        if (err.code === 11000) {
            req.flash("error", "A user with this email already exists.");
        } else {
            req.flash("error", err.message || "Something went wrong.");
        }
        res.redirect("/signup");
    }
};

// Render Login form
module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
};

// Showing login successful after login of an user
module.exports.login = async (req, res) => {
    req.flash("success", "Welcome back to Wanderlust!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

// Logout an user
module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);

        req.flash("success", "You are now logged out!");
        res.redirect("/listings");
    });
};

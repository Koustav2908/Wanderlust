const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema, userSchema } = require("./schema.js");

// Middleware that checks if user is logged in or not
module.exports.isLoggedIn = (req, res, next) => {
    req.session.redirectUrl = req.originalUrl;
    if (!req.isAuthenticated()) {
        req.flash("error", "You must be logged in!");
        return res.redirect("/login");
    }
    next();
};

// Middlewarwe that saves the value of redirectUrl to res.locals
module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

// Middleware that checks if current user can have access of a listing
module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing.owner._id.equals(res.locals.currUser._id)) {
        req.flash("error", "Sorry, you don't have permission!");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

// Middleware that checks if current user can have access of a review
module.exports.isReviewAuthor = async (req, res, next) => {
    let { id, reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if (!review.author._id.equals(res.locals.currUser._id)) {
        req.flash("error", "Sorry, you don't have permission!");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

// Middleware that omits the trailing slashes (/)
module.exports.removeTrailingSlashes = (req, res, next) => {
    if (req.path !== "/" && req.path.endsWith("/")) {
        const trimmedPath = req.path.slice(0, -1);
        return res.redirect(301, trimmedPath + req.url.slice(req.path.length));
    }
    next();
};

// Middleware to validate a listing
module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);

    if (error) {
        let errMsg = error.details.map((el) => el.message).join(", ");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

// Middleware to validate a review
module.exports.validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);

    if (error) {
        let errMsg = error.details.map((el) => el.message).join(", ");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

// Middleware to validate an user
module.exports.validateUser = (req, res, next) => {
    let { error } = userSchema.validate(req.body);

    if (error) {
        let errMsg = error.details.map((el) => el.message).join(", ");
        req.flash("error", errMsg);
        res.redirect("/signup");
    } else {
        next();
    }
};

const Listing = require("../models/listing.js");
const Countries = require("../countries.js");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

// Show all listings
module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
};

// Render new Listing form
module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs", { Countries });
};

// Show a specific listing
module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "author",
            },
        })
        .populate("owner");
    if (!listing) {
        req.flash(
            "error",
            "Sorry, the listing you're trying to find doesn't exist!"
        );
        res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
};

// Create new listing
module.exports.createListing = async (req, res) => {
    let response = await geocodingClient
        .forwardGeocode({
            query: req.body.listing.location,
            limit: 1,
        })
        .send();
    if (!req.file && !req.file.path && !req.file.filename) {
        req.flash("error", "Sorry, image is required!");
        return res.redirect("/listings/new");
    }
    let url = req.file.path;
    let filename = req.file.filename;

    const newListing = new Listing(req.body.listing);

    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    newListing.geometry = response.body.features[0].geometry;

    let savedListing = await newListing.save();
    console.log(savedListing);

    req.flash("success", "New Listing successfully created!");
    res.redirect("/listings");
};

// Render edit form
module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash(
            "error",
            "Sorry, the listing you're trying to find doesn't exist!"
        );
        res.redirect("/listings");
    }
    let imageUrl = listing.image.url;
    imageUrl = imageUrl.replace("/upload", "/upload/w_250");
    res.render("listings/edit.ejs", { listing, Countries, imageUrl });
};

// Update the listing
module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }
    req.flash("success", "Listing successfully updated!");
    res.redirect(`/listings/${id}`);
};

// Destroy a listing
module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing successfully deleted!");
    res.redirect("/listings");
};

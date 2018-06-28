var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

// INDEX - show all campgrounds
router.get("/", function(req, res) {
	Campground.find({}, function(err, allcampgrounds) {
		if(err) {
			console.log(err);
		} else {
			res.render("campgrounds/index",{campgrounds:allcampgrounds});
		}
	});
});

// CREATE - add new campground to database
router.post("/", isLoggedIn, function(req, res) {
	// get data from the form and add it to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	var newCamp = {name:name, image:image, description: desc, author: author};
	// campgrounds.push(newCamp);
	Campground.create(newCamp, function(err, newlyCreated) {
		if(err) {
			console.log(err);
		} else {
			// redirect to campgrounds page
			res.redirect("/campgrounds");	
		}
	});
});

// NEW - show form to create new campground
router.get("/new", isLoggedIn, function(req, res) {
	res.render("campgrounds/new");
});

// SHOW - show information of a specific campground
router.get("/:id", function(req, res) {
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCamp) {
		if(err) {
			console.log(err);
		} else {
			res.render("campgrounds/show", {campground: foundCamp});
		}
	});
});

// Middleware - checks for login
function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
}

module.exports = router;
 
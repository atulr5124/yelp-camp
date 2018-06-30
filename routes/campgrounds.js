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

// EDIT campground route
router.get("/:id/edit", campgroundAuthorization, function(req, res) {
		Campground.findById(req.params.id, function(err, foundCampground) {
			res.render("campgrounds/edit", {campground: foundCampground});
		});
});

// Update campground route
router.put("/:id", campgroundAuthorization, function(req, res) {
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
		res.redirect("/campgrounds/"+req.params.id);
	});
});

// DESTROY campground
router.delete("/:id", campgroundAuthorization, function(req, res) {
	Campground.findByIdAndRemove(req.params.id, function(err, deleted) {
		res.redirect("/campgrounds");
	});
});

// Middleware - checks for login
function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
}

function campgroundAuthorization(req, res, next) {
	if(req.isAuthenticated()) {
		Campground.findById(req.params.id, function(err, foundCampground) {
			if(err) {
				res.redirect("back");
			} else {
				if(foundCampground.author.id.equals(req.user._id)) {
					next();
				} else {
					res.redirect("back");
				}
			}
		});
	} else {
		res.redirect("back");
	}
}

module.exports = router;
 
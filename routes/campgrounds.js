var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

// INDEX - show all campgrounds
router.get("/", function(req, res) {
	if(req.query.search) {
		const regex = new RegExp(escapeRegex(req.query.search), 'gi');
		Campground.find({name: regex}, function(err, allcampgrounds) {
			if(err) {
				console.log(err);
			} else {
				if(allcampgrounds.length < 1) {
					var nomatch = "No campgrounds found with query "+req.query.search+".";
					req.query.search = "";
					req.flash("error", nomatch);
					res.redirect("/campgrounds");
				} else {
					res.render("campgrounds/index",{campgrounds:allcampgrounds});
				}
			}
		});
	} else {
		Campground.find({}, function(err, allcampgrounds) {
			if(err) {
				console.log(err);
			} else {
				res.render("campgrounds/index",{campgrounds:allcampgrounds});
			}
		});
	}
});

// CREATE - add new campground to database
router.post("/", middleware.isLoggedIn, function(req, res) {
	// get data from the form and add it to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var price = req.body.price;
	var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	var newCamp = {name:name, price: price, image:image, description: desc, author: author};
	// campgrounds.push(newCamp);
	Campground.create(newCamp, function(err, newlyCreated) {
		if(err) {
			console.log(err);
		} else {
			// redirect to campgrounds page
			req.flash("success", "Successfully created campground "+newlyCreated.name);
			res.redirect("/campgrounds");	
		}
	});
});

// NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res) {
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
router.get("/:id/edit", middleware.campgroundAuthorization, function(req, res) {
		Campground.findById(req.params.id, function(err, foundCampground) {
			if(err) {
				req.flash("error", "Cannot find this campground.");
			} else {
				res.render("campgrounds/edit", {campground: foundCampground});
			}
		});
});

// Update campground route
router.put("/:id", middleware.campgroundAuthorization, function(req, res) {
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
		res.redirect("/campgrounds/"+req.params.id);
	});
});

// DESTROY campground
router.delete("/:id", middleware.campgroundAuthorization, function(req, res) {
	Campground.findByIdAndRemove(req.params.id, function(err, deleted) {
		res.redirect("/campgrounds");
	});
});

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;
 
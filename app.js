var express = require("express"),
		app = express(),
		bodyparser = require("body-parser"),
		mongoose = require("mongoose"),
		Campground = require("./models/campground"),
		Comment = require("./models/comment"),
		seedDB = require("./seeds");

// connecting to mongo db
mongoose.connect("mongodb://localhost/yelp-camp");

app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));

seedDB();

// Landing page route
app.get("/", function(req, res) {
	res.render("landing");
});

// INDEX - show all campgrounds
app.get("/campgrounds", function(req, res) {
	Campground.find({}, function(err, allcampgrounds) {
		if(err) {
			console.log(err);
		} else {
			res.render("campgrounds/index",{campgrounds:allcampgrounds});
		}
	});
});

// CREATE - add new campground to database
app.post("/campgrounds", function(req, res) {
	// get data from the form and add it to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newCamp = {name:name, image:image, description: desc};
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
app.get("/campgrounds/new", function(req, res) {
	res.render("campgrounds/new");
});

// SHOW - show information of a specific campground
app.get("/campgrounds/:id", function(req, res) {
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCamp) {
		if(err) {
			console.log(err);
		} else {
			res.render("campgrounds/show", {campground: foundCamp});
		}
	});
});
 
// ==========================================
// Comments Routes
// ==========================================

app.get("/campgrounds/:id/comments/new", function(req, res) {
	Campground.findById(req.params.id, function(err, campground) {
		if(err) {
			res.send(err);
		} else {
			res.render("comments/new", {campground: campground});
		}
	});
});

app.post("/campgrounds/:id/comments", function(req, res) {
	Campground.findById(req.params.id, function(err, campground) {
		if(err) {
			res.send(err);
		} else {
			Comment.create(req.body.comment, function(err, comment) {
				if(err) {
					res.send(err);
				} else {
					campground.comments.push(comment);
					campground.save();
					res.redirect("/campgrounds/"+campground._id);
				}
			});
		}
	});
});

app.listen(3000, function() {
	console.log("Yelp Camp Server has started!")
});
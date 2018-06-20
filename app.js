var express = require("express"),
		app = express(),
		bodyparser = require("body-parser"),
		mongoose = require("mongoose"),
		Campground = require("./models/campground"),
		seedDB = require("./seeds");

seedDB();

// connecting to mongo db
mongoose.connect("mongodb://localhost/yelp-camp");

app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine", "ejs");

// Campground.create({name: "Granite Hills",
// 				   image:"http://source.unsplash.com/gcCcIy6Fc_M",
// 				   description: "Hills only made of granite. Star gazing recommended!"},
// 				   function(err, campground) {
// 					   if(err) {
// 						   console.log(err);
// 					   } else {
// 						   console.log("Newly created campground");
// 						   console.log(campground);
// 					   }
// 				   });

// var campgrounds = [
// 	{name: "Salmon Creek", image:"http://source.unsplash.com/gcCcIy6Fc_M"},
// 	{name: "Granite Hills", image:"http://source.unsplash.com/gcCcIy6Fc_M"},
// 	{name: "Sacred Goat Mountain", image:"http://source.unsplash.com/gcCcIy6Fc_M"},
// 	{name: "Salmon Creek", image:"http://source.unsplash.com/gcCcIy6Fc_M"},
// 	{name: "Granite Hills", image:"http://source.unsplash.com/gcCcIy6Fc_M"},
// 	{name: "Sacred Goat Mountain", image:"http://source.unsplash.com/gcCcIy6Fc_M"},
// 	{name: "Salmon Creek", image:"http://source.unsplash.com/gcCcIy6Fc_M"},
// 	{name: "Granite Hills", image:"http://source.unsplash.com/gcCcIy6Fc_M"},
// 	{name: "Sacred Goat Mountain", image:"http://source.unsplash.com/gcCcIy6Fc_M"}
// 	];

// Landing page route
app.get("/", function(req, res) {
	res.render("landing");
});

// app.get("/campgrounds", function(req, res) {
// 	res.render("campgrounds", {campgrounds: campgrounds});
// });

// INDEX - show all campgrounds
app.get("/campgrounds", function(req, res) {
	Campground.find({}, function(err, allcampgrounds) {
		if(err) {
			console.log(err);
		} else {
			res.render("index",{campgrounds:allcampgrounds});
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
	res.render("new");
});

// SHOW - show information of a specific campground
app.get("/campgrounds/:id", function(req, res) {
	Campground.findById(req.params.id, function(err, foundCamp) {
		if(err) {
			console.log(err);
		} else {
			res.render("show", {campground: foundCamp});
		}
	});
});

app.listen(3000, function() {
	console.log("Yelp Camp Server has started!")
});
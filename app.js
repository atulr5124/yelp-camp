var express = require("express");
var app = express();
var bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine", "ejs");

var campgrounds = [
	{name: "Salmon Creek", image:"https://pixabay.com/get/ec31b90f2af61c22d2524518b7444795ea76e5d004b014439cf2c67ea1eeb0_340.jpg"},
	{name: "Granite Hills", image:"https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104497f9c37ea0ebb6bd_340.jpg"},
	{name: "Sacred Goat Mountain", image:"https://pixabay.com/get/e83db50a21f4073ed1584d05fb1d4e97e07ee3d21cac104497f9c37ea0ebb6bd_340.jpg"}
	];

app.get("/", function(req, res) {
	res.render("landing");
});

app.get("/campgrounds", function(req, res) {
	res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res) {
	// get data from the form and add it to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var newCamp = {name:name, image:image};
	campgrounds.push(newCamp);
	// redirect to campgrounds page
	res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res) {
	res.render("new");
});

app.listen(3000, function() {
	console.log("Yelp Camp Server has started!")
});
var express = require("express");
var app = express();
var bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine", "ejs");

var campgrounds = [
	{name: "Salmon Creek", image:"http://source.unsplash.com/gcCcIy6Fc_M"},
	{name: "Granite Hills", image:"http://source.unsplash.com/gcCcIy6Fc_M"},
	{name: "Sacred Goat Mountain", image:"http://source.unsplash.com/gcCcIy6Fc_M"},
	{name: "Salmon Creek", image:"http://source.unsplash.com/gcCcIy6Fc_M"},
	{name: "Granite Hills", image:"http://source.unsplash.com/gcCcIy6Fc_M"},
	{name: "Sacred Goat Mountain", image:"http://source.unsplash.com/gcCcIy6Fc_M"},
	{name: "Salmon Creek", image:"http://source.unsplash.com/gcCcIy6Fc_M"},
	{name: "Granite Hills", image:"http://source.unsplash.com/gcCcIy6Fc_M"},
	{name: "Sacred Goat Mountain", image:"http://source.unsplash.com/gcCcIy6Fc_M"}
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
var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

// Root route
router.get("/", function(req, res) {
	res.render("landing");
});

// ============================
// Auth Routes
// ============================

// Register Route
router.get("/register", function(req, res) {
	res.render("register");
});

// Handles sign up logic
router.post("/register", function(req, res) {
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user) {
		if(err) {
			req.flash("error", err.message);
			res.render("register");
		} else {
			passport.authenticate("local")(req, res, function() {
				req.flash("success", "Welcome to YelpCamp, "+user.username+"! You are succefully signed up!");
				res.redirect("/campgrounds");
			});
		}
	});
});

// Login Route
router.get("/login", function(req, res) {
	res.render("login");
});

// Handles login logic
router.post("/login", passport.authenticate("local", 
		{successRedirect: "/campgrounds", failureRedirect: "/login"}),
		 function(req, res) {});

// Logout route
router.get("/logout", function(req, res) {
	req.logout();
	req.flash("success", "Successfully logged out.");
	res.redirect("/campgrounds");
});

module.exports = router;
// all the middleware goes here

var middlewareObj = {};
var Campground = require("../models/campground");
var Comment = require("../models/comment");

middlewareObj.campgroundAuthorization = function(req, res, next) {
    if(req.isAuthenticated()) {
		Campground.findById(req.params.id, function(err, foundCampground) {
			if(err) {
				req.flash("error", "Something went wrong. Campground not found.");
				res.redirect("back");
			} else {
				if(foundCampground.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash("error", "You do not have permission to edit this campground.");
					res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error", "You need to be logged in to do that.");
		res.redirect("back");
	}
}

middlewareObj.commentAuthorization = function(req, res, next) {
    if(req.isAuthenticated()) {
		Comment.findById(req.params.comment_id, function(err, foundComment) {
			if(err) {
				req.flash("error", "Something went wrong. Comment not found.");
				res.redirect("back");
			} else {
				if(foundComment.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash("error", "You do not have permission to edit this campground.");
					res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error", "You need to be logged in to do that.");
		res.redirect("back");
	}
}

middlewareObj.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()) {
		return next();
    }
    req.flash("error", "You need to be logged in to do that.");
	res.redirect("/login");
}

module.exports = middlewareObj;
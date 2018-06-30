var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

// Comments - New
router.get("/new", middleware.isLoggedIn, function(req, res) {
	Campground.findById(req.params.id, function(err, campground) {
		if(err) {
			res.send(err);
		} else {
			res.render("comments/new", {campground: campground});
		}
	});
});

// Comments - Create
router.post("/", middleware.isLoggedIn, function(req, res) {
	Campground.findById(req.params.id, function(err, campground) {
		if(err) {
			res.send(err);
		} else {
			Comment.create(req.body.comment, function(err, comment) {
				if(err) {
					req.flash("error", "Something went wrong.");
					res.send(err);
				} else {
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					campground.comments.push(comment);
					campground.save();
					req.flash("success", "Added new comment to "+campground.name);
					res.redirect("/campgrounds/"+campground._id);
				}
			});
		}
	});
});

// Edit Comments
router.get("/:comment_id/edit", middleware.commentAuthorization, function(req, res) {
	Comment.findById(req.params.comment_id, function(err, foundComment) {
		if(err) {
			res.send(err);
		} else {
			res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
		}
	});
});

// Update Comments
router.put("/:comment_id", middleware.commentAuthorization, function(req, res) {
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updated) {
		if(err) {
			res.send(err);
		} else {
			req.flash("success","Successfully updated the comment.");
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});

// Destroy Comments
router.delete("/:comment_id", middleware.commentAuthorization, function(req, res) {
	Comment.findByIdAndRemove(req.params.comment_id, function(err, deleted) {
		if(err) {
			res.send(err);
		} else {
			req.flash("success", "Deleted the comment");
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});

module.exports = router;
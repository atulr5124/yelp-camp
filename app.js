var express = require("express"),
		bodyparser = require("body-parser"),
		mongoose = require("mongoose"),
		passport = require("passport"),
		LocalStrategy = require("passport-local"),
		Campground = require("./models/campground"),
		Comment = require("./models/comment"),
		methodOverride = require("method-override"),
		User = require("./models/user"),
		seedDB = require("./seeds");

// Requiring routes
var commentRoutes = require("./routes/comments"),
	campgroundRoutes = require("./routes/campgrounds"),
	indexRoutes = require("./routes/index");

var app = express();
// connecting to mongo db
mongoose.connect("mongodb://localhost/yelp-camp");

app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));

// seedDB();

// Passport configuration
app.use(require("express-session")({
	secret: "Expecto Patronum",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	next();
});

// Using routes in app
app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(3000, function() {
	console.log("Yelp Camp Server has started!")
});
var express = require("express"),
		bodyparser = require("body-parser"),
		mongoose = require("mongoose"),
		passport = require("passport"),
		LocalStrategy = require("passport-local"),
		flash = require("connect-flash"),
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
//mongoose.connect("mongodb://localhost/yelp-camp");
mongoose.connect("mongodb://atul:Cupertino10@ds123971.mlab.com:23971/yelpcamp");

app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());

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
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

// Using routes in app
app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(process.env.PORT, function() {
	console.log("Yelp Camp Server has started!")
});
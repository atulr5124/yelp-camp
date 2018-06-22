var mongoose = require("mongoose");

// schema setup
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String,
	comments: [
		{type: mongoose.Schema.Types.ObjectId,
		ref: "Comment"}
	]
});

// compile schema into a model
module.exports= mongoose.model("Campground", campgroundSchema);
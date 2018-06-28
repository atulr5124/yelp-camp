var mongoose = require("mongoose");

// schema setup
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	comments: [
		{type: mongoose.Schema.Types.ObjectId,
		ref: "Comment"}
	]
});

// compile schema into a model
module.exports= mongoose.model("Campground", campgroundSchema);
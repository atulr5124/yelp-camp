var mongoose = require("mongoose");
var Campground = require("./models/campground");

var data = [
    {name: "Cloud's Rest",
    image:"http://source.unsplash.com/gcCcIy6Fc_M",
    description:"Welcome to cloud's rest."},
    {name: "Desert Mesa",
    image:"http://source.unsplash.com/y8Ngwq34_Ak",
    description:"Welcome to Desert Mesa."},
    {name: "Canyon Floor",
    image:"http://source.unsplash.com/K9olx8OF36A",
    description:"Welcome to canyon floor."}
];

function seedDB() {
    // Remove all campgrounds
    Campground.remove({}, function(err) {
        if(err) {
            console.log("Error occured");
        } else {
            console.log("Removed campgrounds");
        }
    });

    // Add few campgrounds
    data.forEach(function(seed) {
        Campground.create(seed, function(err, dataCreated) {
            if(err) {
                console.log(err);
            } else {
                console.log("Added a campground");
                Comment.create({text:"This place is great but I wish there was internet.",
            author:"Homer"}, function(err, comment) {
                if(err) {
                    console.log(err);
                } else {
                    dataCreated.comments.push(comment);
                    dataCreated.save();
                    console.log("Added new comment");
                }
            });
            }
        })
    });
}

module.exports = seedDB;

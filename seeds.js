var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {name: "Cloud's Rest",
    image:"http://source.unsplash.com/gcCcIy6Fc_M",
    description:"Spicy jalapeno bacon ipsum dolor amet shankle shank burgdoggen drumstick ham hock picanha short ribs ham. Porchetta hamburger prosciutto chuck doner tenderloin pork. Pig strip steak jerky doner flank ball tip capicola pork. Tenderloin landjaeger sausage sirloin pig, filet mignon hamburger alcatra fatback bresaola pork belly jowl bacon ball tip. Sausage meatloaf cow filet mignon pork loin chuck."},
    {name: "Desert Mesa",
    image:"http://source.unsplash.com/y8Ngwq34_Ak",
    description:"Spicy jalapeno bacon ipsum dolor amet shankle shank burgdoggen drumstick ham hock picanha short ribs ham. Porchetta hamburger prosciutto chuck doner tenderloin pork. Pig strip steak jerky doner flank ball tip capicola pork. Tenderloin landjaeger sausage sirloin pig, filet mignon hamburger alcatra fatback bresaola pork belly jowl bacon ball tip. Sausage meatloaf cow filet mignon pork loin chuck."},
    {name: "Canyon Floor",
    image:"http://source.unsplash.com/K9olx8OF36A",
    description:"Spicy jalapeno bacon ipsum dolor amet shankle shank burgdoggen drumstick ham hock picanha short ribs ham. Porchetta hamburger prosciutto chuck doner tenderloin pork. Pig strip steak jerky doner flank ball tip capicola pork. Tenderloin landjaeger sausage sirloin pig, filet mignon hamburger alcatra fatback bresaola pork belly jowl bacon ball tip. Sausage meatloaf cow filet mignon pork loin chuck."}
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

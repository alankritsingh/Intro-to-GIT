var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var data = [
	{
		name: "Aspen Camps",
		image: "https://www.aspencamp.in/images/slide_1.jpg",
		description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of"
	},
	{
		name: "Arnot Forest Camp",
		image: "https://arnotforestcamp.org/wp-content/uploads/2019/11/cabins-view.png",
		description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of"
	},
	{
		name: "Jewish Camps",
		image: "https://static.timesofisrael.com/www/uploads/2019/01/CAMPStawonga-cabins1WEB.jpg",
		description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of"
	}
]

function seedDB(){
	Campground.remove({},function(err){
		if(err){
		    console.log(err);
		}
		console.log("Removed Campground!!");
		data.forEach(function(seed){
		Campground.create(seed,function(err,campground){
			if(err){
				console.log(err);
			}
			else{
				console.log("Campground is created");
				Comment.create({
					text: "This place is great,but I wish there was Internet",
					author: "Homer"
				},function(err,comment){
					if(err){
						console.log(err);
					}
					else{
						campground.comments.push(comment);
						campground.save();
						console.log("Created New comment");
					}
				});
			}
		});
	});
    });
	
	
}

module.exports = seedDB;



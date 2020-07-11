var mongoose = require("mongoose");

//mongoose.connect("mongodb://localhost/blog_demo");

mongoose.connect("mongodb://localhost:27017/blog_app", {useNewUrlParser: true , useUnifiedTopology: true});


var postSchema = new mongoose.Schema({
	title: String,
	content: String
	
});

var Post = mongoose.model("Post", postSchema);


var userSchema = new mongoose.Schema({
	email: String,
	name: String,
	posts: [postSchema]
});

var User = mongoose.model("User", userSchema);


// var newUser = new User({
// 	email: "hermoine@hogwarts.edu",
// 	name: "Hermoine Granger"
// });

// newUser.posts.push({
// 	title: "Just cant think of any title ",
// 	content: "Blah Blah blaha"
// });

// newUser.save(function(err, user){
// 	if(err)
// 		{
// 			console.log(err);
// 		}
// 	else{
// 		console.log(user);
// 	}
// });


// var newPost = new Post({
// 	title: "Apples are super healthy",
// 	content: "An apple a day keeps doctors away"
// });

// newPost.save(function(err,post){
// 	if(err)
// 		{
// 			console.log(err);
// 		}
// 	else{
// 		console.log(post);
// 	}
// });

User.findOne({name:"Hermoine Granger"},function(err,user){
	if(err)
		{
			console.log(err);
		}
	else{
		user.posts.push({
			title: "The thing I hate the most",
			content: "Voldermot"
		});
		user.save(function(err,user){
			if(err){
				console.log(err);
			}
			else{
				console.log(user);
			}
		});
	}
});

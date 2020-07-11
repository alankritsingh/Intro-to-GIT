var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/blog_app", {useNewUrlParser: true , useUnifiedTopology: true});
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

app.set("view engine","ejs");

var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	date: {type: Date,default: Date.now}
});

var Blog = mongoose.model("Blog",blogSchema);

app.get("/blogs",function(req,res){
	
	Blog.find({},function(err,blogs){
		if(err){
			console.log(err);
		}
		else{
			res.render("index",{blogs: blogs});
		}
	});
});
app.post("/blogs",function(req,res){
	var title = req.body.title;
	var image = req.body.image;
	var body = req.body.body;
	var newBlog = {
		title: title,
		image: image,
		body: body
	}
	Blog.create(newBlog,function(err,newblog){
		if(err)
			{
				res.render("new");
			}
		else{
			res.redirect("/blogs");
		}
	});
});

app.get("/",function(req,res){
	res.redirect("/blogs");
});

app.get("/blogs/new",function(req,res){
	res.render("new");
});

app.get("/blogs/:id",function(req,res){
	Blog.findById(req.params.id,function(err,foundBlog){
		if(err)
			{
				res.redirect("/blogs");
			}
		else{
			res.render("show",{theBlog: foundBlog});
		}
	});
});

app.get("/blogs/:id/edit",function(req,res){
	Blog.findById(req.params.id,function(err,foundBlog){
		if(err)
			{
				res.redirect("/blogs");
			}
		else{
			res.render("edit",{blog: foundBlog});
		}
	});
});

app.put("/blogs/:id",function(req,res){
	
	//res.send("Updated");
	var blog = {
		title: req.body.title,
		image: req.body.image,
		body: req.body.body
	}
	Blog.findByIdAndUpdate(req.params.id , blog , function(err,updateBlog){
		if(err)
			{
				res.redirect("/blogs");
			}
		else{
			//console.log("No error!!");
			res.redirect("/blogs/" + req.params.id);
		}
	});
});

app.delete("/blogs/:id",function(req,res){
	//res.send("You have reached the delete route");
	Blog.findByIdAndRemove(req.params.id,function(err){
		if(err)
			{
				res.redirect("/blogs");
			}
		else{
			res.redirect("/blogs");
		}
	});
});

app.listen(3000,function(){
	console.log("BLOG  app has been started");
});
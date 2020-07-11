var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

router.get("/",function(req,res){
	Campground.find({},function(err,allCampgrounds){
		if(err){
			console.log(err);
		}
		else{
	         res.render("campgrounds/index",{campgrounds: allCampgrounds});
		}
	});
	
	
});

router.post("/",middleware.isLoggedIn,function(req,res){
	var name = req.body.CampName;
	var image = req.body.CampImage;
	var des = req.body.description;
	var price = req.body.price;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var newCampground = {name: name,image: image, description: des,author: author,price: price};
	//campSites.push(newCampground);
	//campground.save();
	Campground.create(newCampground,function(err,newCreated){
		if(err){
			req.flash("error","Something went wrong while creating the campground!!");
			//console.log(err);
		}
		else{
			req.flash("success","You have contributed by creating a new campground!!");
			res.redirect("/campgrounds");
	
		}
	})
});

router.get("/new",middleware.isLoggedIn,function(req,res){
	req.flash("info","You can create a new Campground here");
	res.render("campgrounds/new");
});

router.get("/:id",function(req,res){
	Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
		if(err)
			{
				console.log(err);
			}
		else{
			//console.log(foundCampground);
			res.render("campgrounds/show",{campground: foundCampground});
		}
	});
});

router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
		Campground.findById(req.params.id,function(err,foundCampround){
			res.render("campgrounds/edit",{campground: foundCampround});
		});	
	
});

router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
	Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
		if(err)
			{
				res.redirect("/campgrounds");
			}
		else{
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){
	Campground.findByIdAndRemove(req.params.id,function(err){
		if(err){
			req.flash("error","Something went wrong while deleting that campground!!");
			res.redirect("/campgrounds");
		}
		else{
			req.flash("success","Deleted Campground!!");
			res.redirect("/campgrounds");
		}
	});
});


module.exports = router;

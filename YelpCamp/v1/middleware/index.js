var Campground = require("../models/campground.js");
var Comment = require("../models/comment.js");
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function (req,res,next){
	if(req.isAuthenticated())
		{
			Campground.findById(req.params.id,function(err,foundCampround){
			if(err){
				req.flash("error","Campground not found!!");
				res.redirect("back");
			}
			else{
				if(foundCampround.author.id.equals(req.user._id))
					{
						next();
					}
				else{
					req.flash("error","You dont have permission to do that");
					res.redirect("back");
				}
			}
			});
		}
	else{
		req.flash("error","You need to be logged in to do that");
		res.redirect("back");
	}
}

middlewareObj.checkCommentOwnership = function (req,res,next){
	if(req.isAuthenticated())
		{
			Comment.findById(req.params.comment_id,function(err,foundComment){
			if(err){
				req.flash("error","Campground not found!!");
				res.redirect("back");
			}
			else{
				if(foundComment.author.id.equals(req.user._id))
					{
						next();
					}
				else{
					req.flash("error","You dont have permission to do that");
					res.redirect("back");
				}
			}
	        });
		}
	else{
		req.flash("error","You need to be logged in to do that!!");
		res.redirect("back");
	}
}

middlewareObj.isLoggedIn = function (req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error","You need to be Logged in to do that!!");
	res.redirect("/login");
}



module.exports = middlewareObj;
var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

// SHOW ALL CAMPGROUNDS
router.get("/",function(req , res){
    Campground.find({},function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
           res.render("campgrounds/index",{campgrounds: allCampgrounds}); 
        }
    });
});
// CREATE NEW CAMPGROUNDS
router.post("/",middleware.isLoggedIn,function(req , res){
   var name = req.body.name;
    var image = req.body.image;
    var price = req.body.price;
    var desc = req.body.description;
    var author = {
      id:req.user._id,
      username:req.user.username
    };
    var newCampground = {name:name,image:image,description:desc,author:author,price:price};
    Campground.create(newCampground, function(err , newlyCreatedCampground){
        if(err){
            console.log(err);
        } else {
            
            res.redirect("/campgrounds");
        }
    });
    
});

router.get("/new",middleware.isLoggedIn,function(req , res){
    res.render("campgrounds/new");
});

router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req , res){
            Campground.findById(req.params.id,function(err, foundCampground){
                res.render("campgrounds/edit",{campground:foundCampground});
            });
});
// DELETE REQUEST

router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){
   Campground.findByIdAndRemove(req.params.id,function(err){
       if(err){
           console.log(err);
           res.redirect("/campgrounds");
       } else {
           res.redirect("/campgrounds");
       }
   });
});
// UPDATE CAMPGROUNDS PUT REQUEST
router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
       if(err){
           console.log(err);
           res.redirect("/campgrounds");
       } else {
           res.redirect("/campgrounds/"+ req.params.id);
       }
    });
});




// SHOWS MORE INFO OF ONE CAMP GROUND
router.get("/:id",function(req , res){
    
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/show",{campground:foundCampground});        
        }
    });
     
});





module.exports = router;
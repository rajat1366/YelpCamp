var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
        {   
            name:"Clouds Rest", 
            image:"https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg",
            description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
        },
         {   
            name:"Desert Mesa", 
            image:"https://farm9.staticflickr.com/8167/7121865553_e1c6a31f07.jpg",
            description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
        },
         {   
            name:"Canyon Floor", 
            image:"https://farm8.staticflickr.com/7258/7121861565_3f4957acb1.jpg",
            description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
        }
    ];

function seedDB(){
        Comment.remove({},function(err){
            if(err){
                console.log(err);
            }
        });
        Campground.remove({},function(err){
           if(err){
               console.log(err);
           } else {
               console.log("Removed campgrounds");
               data.forEach(function(seed){
                   Campground.create(seed,function(err,campground){
                       if(err) {
                           console.log(err)
                       } else {
                           console.log("added a campground");
                           Comment.create(
                               {
                                   text:"This place is great but no internet",
                                   author:"Ernie"
                               },function(err,comment){
                               if(err){
                                   console.log(err)
                               } else {
                                   campground.comments.push(comment);
                                   campground.save();
                                   console.log("comment save");
                               }
                           });
                       }
                   }) ;
                });
           }
        });
        
}

module.exports = seedDB;
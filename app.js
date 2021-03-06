var express        = require("express"),
        app        = express(),
        bodyParser = require("body-parser"),
        mongoose   = require("mongoose"),
        passport   = require("passport"),
        LocalStrategy = require("passport-local"),
        Campground = require("./models/campground"),
        Comment    = require("./models/comment"),
        User       = require("./models/user"),
        methodOverride = require("method-override"),
        flash      = require("connect-flash"),
        seedDB     = require("./seeds");

var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes       = require("./routes/index"); 
        

//mongoose.connect("mongodb://localhost/yelp_camp");
mongoose.connect("mongodb://rajat:yelpcamp@ds161121.mlab.com:61121/yelp_camp");

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());

//seedDB();

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret:"This will be used for ecryption purposes",
    resave:false,
    saveUninitialized:false

}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/",indexRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds",campgroundRoutes);


app.listen(process.env.PORT,process.env.IP , function(){
   console.log("Server Started!!"); 
});
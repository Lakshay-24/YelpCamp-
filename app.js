var app=require("express")(),
bodyParser=require("body-parser"),
mongoose=require("mongoose")
campground=require("./models/campground"),
comment=require("./models/comment"),
seedDb=require("./seeds");
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb://localhost/YelpCamp",{useNewUrlParser: true,
useUnifiedTopology:true});
app.set("view engine","ejs");
seedDb();
// campground.create({
//         name:"chaupta", 
//         image:"https://images.unsplash.com/photo-1510312305653-8ed496efae75?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
//         description:"A very snowy place, amidst meadows of snow between the breathtaking himalayas"
//     },
// function(err,campground){
//     if(err)
//     console.log(err);
//     else
//     console.log(campground);
// });
var campgrounds=[ { name:"kheerganga", image:"https://images.unsplash.com/photo-1537905569824-f89f14cceb68?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
{ name:"triund",image:"https://images.unsplash.com/photo-1486915309851-b0cc1f8a0084?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
{ name:"kheerganga", image:"https://images.unsplash.com/photo-1537905569824-f89f14cceb68?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
{ name:"chaupta", image:"https://images.unsplash.com/photo-1510312305653-8ed496efae75?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"}
];

app.get("/",function(req,res)
{ res.render("home");
})

app.post("/campgrounds",function(req,res){
    var newcamp={ name:req.body.name,
    image:req.body.image,description:req.body.description};
    campground.create(newcamp,function(err,newlyadded)
    { if(err)
        console.log(err);
    else
        res.redirect("/campgrounds");
    });
   
})
app.get("/campgrounds/new",function(req,res){
    res.render("campgrounds/new");
}) 
app.get("/campgrounds/:id",function(req,res){
    campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err)
        console.log(err);
        else
        res.render("campgrounds/show",{campground:foundCampground});
    });
})
app.get("/campgrounds",function(req,res)
    { campground.find({},function(err,allCampgrounds){
        if(err)
            console.log(err);
        else
            res.render("campgrounds/index",{campgrounds:allCampgrounds});
    })
});
//Comments Routes
app.get("/campgrounds/:id/comments/new",function(req,res){
campground.findById(req.params.id,function(err,foundCampground){
    if(err)
    console.log(err);
    else
    {  
        res.render("comments/new",{campground: foundCampground});  
    }
})
});
app.post("/campgrounds/:id/comments",function(req,res){
    campground.findById(req.params.id,function(err,campground){
        if(err)
        console.log(err);
        else
        comment.create(req.body.comment,function(err,found){
            if(err)
            console.log(err);
            else
            { campground.comments.push(found);
              campground.save();
              res.redirect("/campgrounds/"+req.params.id)
            }

        });
    });
        
})
    app.listen(3000,function(){
    console.log("YelpCamp has started");
})

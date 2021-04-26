var mongoose=require("mongoose"),
comment=require("./models/comment");
campground=require("./models/campground"),

data=[{
    name: "Chaupta",
    image: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    description:"A very nice and rejuvanating place meant for nature's beauty and finding one's soul"}
    ,{
    name:"kheerganga", 
    image:"https://images.unsplash.com/photo-1537905569824-f89f14cceb68?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    description:"A vibrant and lively destination with ever increasing number of trekkers every year"
},{
    name:"triund",
    image:"https://images.unsplash.com/photo-1486915309851-b0cc1f8a0084?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    description:"Tranquil place full of natural beauty marked with some great altitude and challenging trekkig"
}];

function seedDb(){
    campground.remove({},function(err){
        if(err)
        console.log(err);
        else 
        console.log("DB empty");
});
data.forEach(function(seed){
    campground.create(seed,function(err,campground){
        if(err)
        console.log(err);
        else
        {console.log("campground added");
        comment.create({
            text: "nice place but no internet available",
            author:"raghav"
        },function(err,comment){
            if(err)
            console.log(err);
            else 
            {campground.comments.push(comment)
             campground.save();   
            }
        });
    
        }
    
    
    
    })
})
}

module.exports=seedDb;
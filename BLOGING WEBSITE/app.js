
var express  =  require("express"),
mongoose     =  require("mongoose"),
bodyParser   =  require("body-parser"),
expressSanitizer=require("express-sanitizer"),
methodOverride = require("method-override")
var app=express()
app.set("view engine","ejs")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))
app.use(expressSanitizer());
app.use(methodOverride("_method"))
mongoose.connect("mongodb://localhost:27017/restful_blog_app",{useNewUrlParser:true})
var blogSchema=new mongoose.Schema({
    title:String,
    image:{type:String, default:"https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg"},
    body:String,
    created:{type:Date,default:Date.now}
})
var Blog=mongoose.model("Blog",blogSchema)
console.log("one time use")
console.log("***************************")
/*
Blog.create({
    title:"Rustty",

    body:"how nice dogs are looking"
 
}) */
app.get("/blogs",function(req,res){
Blog.find({},function(err,blogs){
    if(err){
        console.log(err)}
        else{
            res.render("index",{blogs:blogs})
        }
})
})
app.get("/blogs/new",function(req,res){
    res.render("new")
})

app.post("/blogs",function(req,res){
    //req.body.blog.body=req.sanitize(req.body.blog.body)
    //console.log(req.body.blog.body)
    req.body.blog.body=re.sanitize(req.body.blog.body)
    Blog.create({title:req.body.blog.title,
        image:req.body.blog.image,
        body:req.body.blog.body},function(err,blogs){
if(err){
    console.log(err)
}
else{
    res.redirect("/blogs")}
    })
})
app.get("/blogs/:id",function(req,res){
    Blog.findById(req.params.id,function(err,blog1){
        if(err){
            console.log(err) 
        }
        else{
           res.render("shows",{blogs:blog1})
        }
    })
})

app.get("/blogs/:id/edit",function(req,res){
    Blog.findById(req.params.id,function(err,blog){
        if(err){
            console.log(err)
        }
        else{
            res.render("edit",{blogs:blog})
        }})})
app.put("/blogs/:id",function(req,res){
req.body.blogs.body=req.sanitize(req.body.blogs.body)
    Blog.findByIdAndUpdate(req.params.id, req.body.blogs,function(err,blog1){
    //console.log(blog1)
        if(err){
        console.log(err)
    }
    else{
       // res.render("shows",{blogs:blog1})
        res.redirect("/blogs/"+req.params.id)
    }})})

app.delete("/blogs/:id",function(req,res){
    Blog.findByIdAndRemove(req.params.id,function(err,blog1){
        if(err){
            console.log(err)
        }
        else{
            res.redirect("/blogs")
        }
    })
})
    app.listen(3000,function(){
    console.log("started")
})



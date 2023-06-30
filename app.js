require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const saltRounds=10;

mongoose.connect("mongodb://localhost:27017/userDB");
console.log("Mongoose connected successfully");

const userSchema=new mongoose.Schema({
  email: String,
  password: String
});

const User = mongoose.model("User",userSchema);

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  res.render("home");
});

app.get("/login",function(req,res){
  res.render("login");
});

app.get("/register",function(req,res){
  res.render("register");
})

app.post("/register",function(req,res){
  bcrypt.hash(req.body.password, saltRounds).then(function(hash) {
    const newUser = new User({
      email: req.body.username,
      password: hash
    });
    newUser.save().then(function(){
      res.render("secrets");
    }).catch(function(error){
      console.log(error);
    });
  });
})

app.post("/login",function(req,res){
  User.findOne({email: req.body.username}).then(function(foundUser){
    if(!foundUser)
    console.log("User does not exist");
    else{
      bcrypt.compare(foundUser.password,req.body.password).then(function(result) {
        res.render("secrets");
      });
    }
  }).catch(function(error){
    console.log(error);
  });
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});

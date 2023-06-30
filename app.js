require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose=require("mongoose");
const session=require("express-session");
const passport=require("passport");
const passportLocalMongoose=require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate=require("mongoose-findorcreate")

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(session({
  secret: "My little secret",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/userDB");
console.log("Mongoose connected successfully");

const userSchema=new mongoose.Schema({
  username: String,
  password: String,
  googleId: String,
  secret: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = mongoose.model("User",userSchema);

passport.use(User.createStrategy());

passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
        done(null,user);
    })
});

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets"
  },
  function(accessToken, refreshToken, profile, cb) {
    //console.log(profile);
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

app.get("/",function(req,res){
  res.render("home");
});

app.get("/login",function(req,res){
  res.render("login");
});

app.get("/register",function(req,res){
  res.render("register");
});

app.get("/secrets",function(req,res){
  User.find({"secret": {$ne: null}}).then(function(foundUsers){
    if(foundUsers){
      res.render("secrets",{usersWithSecrets: foundUsers});
    }
  }).catch(function(error){
    console.log(error);
  })
});

app.get("/logout",function(req,res){
  req.logout(function(err) {
    if (err) {
      console.log(error);
    } else {
      res.redirect("/");
    }
  });
});

app.get("/auth/google",
  passport.authenticate("google", { scope: ["profile"] }));

app.get("/auth/google/secrets",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function(req, res) {
    // Successful authentication, redirect to secrets.
    res.redirect("/secrets");
});

app.get("/submit",function(req,res){
  if(req.isAuthenticated()){
    res.render("submit");
  } else {
    res.redirect("/login");
  }
});



app.post("/register",function(req,res){
  User.register({username: req.body.username}, req.body.password, function(err,user){
    if(err){
      console.log(error);
      res.redirect("/register");
    } else{
      passport.authenticate("local")(req,res,function(){
        res.redirect("/secrets");
      });
    }
  });
});

app.post("/login",function(req,res){
  const user=new User({
    username: req.body.username,
    password: req.body.password
  });
  req.login(user,function(error){
    if(error){
      console.log(error);
    } else {
      passport.authenticate("local")(req,res,function(){
        res.redirect("/secrets");
      });
    }
  })
});

app.post("/submit",function(req,res){
  const submittedSecret= req.body.secret;

  User.findById(req.user.id).then(function(foundUser){
    if(foundUser){
      foundUser.secret = submittedSecret;
      foundUser.save().then(function(){
        res.redirect("/secrets");
      });
    }
  }).catch(function(error){
    console.log(error);
  });
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});

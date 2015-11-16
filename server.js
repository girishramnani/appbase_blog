global.Intl = require('intl');
var express  = require("express");
var express_hbs = require('express-handlebars');
var Appbase = require('appbase-js');
var fs = require("fs");
var bodyParser = require("body-parser");
var session =require("express-session");
var uuid = require('uuid');
var HandlebarsIntl = require('handlebars-intl');

var config = require("../appbaseConfig");
var auth_route = require("./routes/auth");
var post_route = require("./routes/post");

var session_uids ={};
var seed_posts = require("./seed");




if(!fs.existsSync("./cred.json"))
{

        console.error("No Super User found");
        console.log("Create using `gulp createSuperUser --silent`");
        process.exit();

 }


// use you appbase credentials here
var appbaseRef = new Appbase(config);


// using create to expose the handlebars object
var expressHbs =  express_hbs.create({
  extname:'hbs',
   defaultLayout:'main.hbs',
   helpers: {
      currentUser:function(){
        if(auth_route.main_context.admin){
          return true;
        }
        return false;
      }

  }});

HandlebarsIntl.registerWith(expressHbs.handlebars);

var app = express();

app.use("/static",express.static(__dirname+"/public"));

app.engine('hbs',expressHbs.engine);

app.set('view engine', 'hbs');
app.use( bodyParser.json());
app.use(bodyParser.urlencoded({
      extended: true
}));
app.use(session({secret:'something which no one can find'}));



app.use("/auth",auth_route);
app.use("/post",post_route);


app.get("/",function(req,res){
    console.log(expressHbs);
    res.render("index",{
      posts :seed_posts
    });
});
app.get("/about",function(req,res){
     res.render("about");

});

app.get("/contact",function(req,res){
   res.render("contact");
});




 app.use(function(req, res, next) {
     res.status(404);
      res.render("404",{layout:false});
});




app.listen(8000);

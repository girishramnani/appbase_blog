var express  = require("express");
var express_hbs = require('express-handlebars');
var Appbase = require('appbase-js');
var config = require("../appbaseConfig");
var fs = require("fs");
var auth = require("./routes/auth");
var bodyParser = require("body-parser");
var session =require("express-session");
var uuid = require('uuid');
var post = require("./routes/post");
var session_uids ={};




if(!fs.existsSync("./cred.json"))
{

        console.error("No Super User found");
        console.log("Create using `gulp createSuperUser --silent`");
        process.exit();

 }





// use you appbase credentials here
var appbase = new Appbase(config);


var app = express();
app.use("/static",express.static(__dirname+"/public"));

app.engine('hbs', express_hbs({
  extname:'hbs',
   defaultLayout:'main.hbs',
   helpers: {

      // loggedIn:function(block) {
      //
      //   if (auth.main_context.admin){
      //     return block(this);
      //   }
      // },
      // notloggedIn: function(block){
      //
      //     if (!auth.main_context.admin){
      //       return block(this);
      //     }
      //   }
      currentUser:function(){

        if(auth.main_context.admin){
          return true;

        }
        return false;
      }

  }}));

app.set('view engine', 'hbs');
app.use( bodyParser.json());
app.use(bodyParser.urlencoded({
      extended: true
}));

app.use(session({secret:'something which no one can find'}));



app.use("/auth",auth);
app.use("/post",post);

app.get("/",function(req,res){

    res.render("index");

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

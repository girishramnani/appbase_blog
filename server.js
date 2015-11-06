var express  = require("express");
var express_hbs = require('express-handlebars');
var Appbase = require('appbase-js');
var config = require("../appbaseConfig");





// use you appbase credentials here
var appbase = new Appbase(config);


var app = express(config);
app.use(express.static(__dirname+"/public"));
app.engine('hbs', express_hbs({extname:'hbs', defaultLayout:'main.hbs'}));
app.set('view engine', 'hbs');

app.get("/",function(req,res){

  res.render("index");

});

app.listen(8000);

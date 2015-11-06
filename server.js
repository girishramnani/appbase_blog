var express  = require("express");

var app = express();
var express_hbs = require('express-handlebars');
app.use(express.static(__dirname+"/public"));


app.engine('hbs', express_hbs({extname:'hbs', defaultLayout:'main.hbs'}));
app.set('view engine', 'hbs');

app.get("/",function(req,res){

  res.render("index");

});

app.listen(8000);

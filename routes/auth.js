var express = require('express');

var router = express.Router();
var bcrypt = require("bcryptjs");
var cred = require("../cred.json");

router.route("/login")

.get(function(req,res){

    res.render("login",{layout:false});

})
.post(function(req,res){
     console.log(req.body.username);
     console.log(req.body.password);

});

router.get('/logout/',function(req,res){

    res.redirect("/login");

});

module.exports =  router;

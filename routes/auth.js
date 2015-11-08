var express = require('express');

var router = express.Router();


router.get('/login/',function(req,res){

    res.render("login",{layout:false});

});

router.get('/logout/',function(req,res){

    res.redirect("/login");

});

module.exports =  router;

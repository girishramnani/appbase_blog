import express = require('express');

var router = express.Router();


router.get('/login',function(req,res){

    res.render("login");

});

router.get('/logout',function(req,res){

    res.redirect("/login");

});


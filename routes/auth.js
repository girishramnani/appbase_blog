var express = require('express');

var router = express.Router();
var bcrypt = require("bcryptjs");
var cred = require("../cred.json");
var error_context={
    had_once: false,
};


router.route("/login")
.get(function(req,res){
    
    if (error_context.had_once){
        error_context.message = undefined;
    }
    error_context.had_once = true;



    res.render("login",{
        layout:false,
        errors: error_context
    });

})
.post(function(req,res){
     console.log(req.body.email);
     console.log(req.body.password);
     var email = req.body.email;
     var password =req.body.password;
     if(cred.email !== email){
        error_context.message = "the username or password is incorrect";
         error_context.had_once = false;
        res.redirect("/auth/login");
     }
    

});

router.get('/logout/',function(req,res){

    res.redirect("/login");

});

module.exports =  router;

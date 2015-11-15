var express = require('express');
var router = express.Router();
var session =require("express-session");
var uuid = require('uuid');

var bcrypt = require("bcryptjs");
var cred = require("../cred.json");
var main_context ={};

var error_context={
    had_once: false,
};

router.main_context = main_context;

router.route("/login")
.get(function(req,res){
  console.log(req.session.uuid);
  if (req.session.uuid) {

    res.redirect("/");
  }{
    console.log(req.session.uuid);


    if (error_context.had_once){
        error_context.message = undefined;
    }
    error_context.had_once = true;



    res.render("login",{
        layout:false,
        errors: error_context
    });
}
})
.post(function(req,res){
     console.log(req.body.email);
     console.log(req.body.password);
     var email = req.body.email;
     var password =req.body.password;
     if(cred.email === email){
       bcrypt.compare(password,cred.password,function(err,outcome){

         console.log(err);
         if(outcome){
           var admin_uuid = uuid.v4();
           req.session.uuid = admin_uuid;
           main_context["admin"] = admin_uuid;
           res.redirect("/");

         }
         else{

           error_context.message = "the username or password is incorrect";
            error_context.had_once = false;
           res.redirect("/auth/login");

         }

       });


 }
    else{
      error_context.message = "the username or password is incorrect";
       error_context.had_once = false;
      res.redirect("/auth/login");
    }


});

router.get('/logout/',function(req,res){
    req.session.destroy(function(err){
      if (err) {
          console.error(err);
      }
    });
    main_context.admin = undefined;

    console.log(req.session);

    res.redirect("/");

});

module.exports =  router;

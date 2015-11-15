var express = require("express");
var router = express.Router();

function if_login(req,res,cb){
  if(!req.session.uuid){
    res.redirect("/");
  }
  else{
    cb(req,res);
  }


}

router.get('/create',function(req,res){
    if_login(req,res,function(req,res){

      res.render("editor",{layout: false});

    });
});

module.exports = router;

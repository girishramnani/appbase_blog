var express = require("express");
var router = express.Router();
var appbaseRef = require("../appbase");
var uuid = require('uuid');
var m = require("../model");

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
})



.post('/create',function(req,res){

  console.log(req.body);

  var content_id = uuid.v4();

  var new_post = new m.Post(req.body.title,req.body.subtitle);
  new_post.addContent(content_id);


  console.log(new_post.toJson());


  appbaseRef.ar.index({
    type:'posts',
    body:new_post.toJson(),
  });




  appbaseRef.ar.index({
    type:'post-content',
    body:{
      content:req.body.data
    },
    id:content_id
  });
  
  res.end("success");


});

module.exports = router;

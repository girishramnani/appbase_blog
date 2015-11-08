var bcrypt = require("bcryptjs");
var gulp = require("gulp");
var prompt = require("prompt");
var fs = require("fs");
var properties = [
    {
      name: 'username', 
      validator: /^[a-zA-Z\s\-]+$/,
      warning: 'Username must be only letters, spaces, or dashes'
    },
    {
      name: 'password',
      hidden: true
    }
  ];


gulp.task("createSuperUser",function(){

    prompt.start();
    prompt.get(properties, function (err, result) {
    if (err) { return onErr(err); }

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(result.password);
     var obj ={
        username:result.username,
        password: hash
     };
     var json = JSON.stringify(obj);
     fs.writeFile("cred.json",json,function(err){
         if(err){
         console.error(err);
         }

     });

    
    });

  function onErr(err) {
    console.error(err);
    return 1;
  }
    

});
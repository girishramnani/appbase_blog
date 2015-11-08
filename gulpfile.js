var bcrypt = require("bcryptjs");
var gulp = require("gulp");
var prompt = require("prompt");
var fs = require("fs");
var properties = [
    {
      name: 'email', 
      validator:  /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
      warning: 'the email address provided is invalid'
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
        email:result.email,
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

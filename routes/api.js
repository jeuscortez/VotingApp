var express = require('express');
var router = express();
//.Router({ caseSensitive: true });
var bcrypt = require("bcrypt-nodejs");
var jwt = require("jsonwebtoken");
var User = require("../models/user");



//verification of token
router.post('/verify',function(request,response){
    //console.log(request.headers);
    //var token = request.headers.authorization.split('')[1];
    //console.log(request.body.token);
    
    if(!request.body.token){
        return response.status(400).send('No token has been provided!');
    }
    
    jwt.verify(request.body.token,process.env.secret,function(err,decoded){
       if(err){
           return response.status(400).send("Error with Web Token");
       }
       return response.status(200).send(decoded);
    });
    
});

//Login
router.post('/login',function(request, response) {
   
   if(request.body.name && request.body.password){
       User.findOne({name: request.body.name},function(err,user){
           if(err){
               return response.status(400).send("An error has occured. Please Try Again");
           }
           if(!user){
               return response.status(404).send("No User exists with inputed credentials");
           }
           if(bcrypt.compareSync(request.body.password, user.password)){
               //return response.status(200).send(user);
               var token = jwt.sign({
                   data: user
               }, process.env.secret,{ expiresIn: 3600 });
               return response.status(200).send(token);
           }
           
           return response.status(400).send("Password is not correct");
       });
   }else{
       return response.status(400).send("Please enter valid credentials!!");
   }
   
    
});

//Register
router.post('/register', function(request, response){
   if(request.body.name && request.body.password){
       var user = new User();
       user.name = request.body.name;
       console.time('bcryptHashing');
       user.password = bcrypt.hashSync(request.body.password, bcrypt.genSaltSync(10));
       console.timeEnd('bcryptHashing');
       user.save(function(err,document){
           if(err){
               return response.status(400).send(err);
           }else{
               var token = jwt.sign({
                   data: document
               },process.env.secret,{expiresIn: 3600});
               
               return response.status(201).send(token);
           }
       })
       
   }else{
       return response.status(400).send({
           message: "Invalid credentials supplied!"
       })
   }
});





module.exports = router;
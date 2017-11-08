var http = require('http');
var path = require('path');

//db string
var db = "mongodb://jeuscortezdb";

//db process
var port = process.env.PORT || 8000;

//node modules
var async = require('async');
var socketio = require('socket.io');
var express = require('express');
var morgan = require("morgan");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var dotenv = require("dotenv");
//var angular = require('angular');

//create express app
var app = express();

//environment variables
dotenv.config({verbose: true});

//connect to mongoose
mongoose.connect(process.env.MONGO_URI,function(err){
  if(err){
    console.log("error");
  }
});

//listen to mongoose connection
mongoose.connection.on('connected',function(){
  console.log("Successfully opened a connection to "+db);
});

mongoose.connection.on('disconnected',function(){
  console.log("Successfully disconnected from "+db);
});

mongoose.connection.on('error',function(){
  console.log("an error has occured while attempt to connect to "+db);
});


//configure express middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/node_modules',express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname,'/client'));
app.get("*",function(request,response){
  response.sendfile(__dirname + '/client/index.html');
});

//set up server
app.listen(port,function(){
  console.log("listening on " + port);
});


console.log(process.env.secret);
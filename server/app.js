var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

app.use(bodyParser.json());

//model
var Student = require('../models/assignments.js');

var mongoURI = "mongodb://localhost:27017/assignments";
mongoose.connect(mongoURI);


app.listen('9001', function(){
  console.log("I'm listening on port 9001");
});//end server spinup

// app.get( '/', function(req,res){
//   console.log('base url HIT HIT HIT');
//   res.sendFile( path.resolve('public/index.html'));
// }); // end base url
//
// app.use( express.static('public'));

app.get("/*", function(req,res){
    console.log("Here is the property: ", req.params[0]);
    var file = req.params[0] || "index.html";
    res.sendFile(path.join(__dirname, "/public/", file));
});



app.get('/all/:id?', function(req,res){
  console.log('req.params ',req.params);
  var studentQuery;
  if(req.params.id){
    console.log('if');
    studentQuery = {"_id":req.params.id};
  }//end if
  else{
    console.log('else');
    studentQuery = {};
  }//end else
  Student.find(studentQuery, function(err, studentResults) {
    if(err){
      console.log('error occurred:', err);
      res.sendStatus(500);
    }//end if in student find
    else{
      console.log('student Results',studentResults);
      res.send(studentResults);
    }//end else in student find
  });//end function
});//end all

app.post('/create', function(req,res){
console.log('in create');
  var newStudent = new Student({
    student_name: req.body.student_name,
    assignment_number: req.body.assignment_number,
    score: req.body.score,
    date_completed: req.body.date_completed
  });//end create

  newStudent.save(function(err){
    if(err){
      console.log('error occurred:', err);
      res.sendStatus(500);
    }//end if
    else{
      res.sendStatus(201);
    }//end else
  });//end newStudent save
});//end create

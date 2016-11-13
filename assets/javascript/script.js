"use strict";

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAXKU0apPYBHcHWs8ET_kIGF5VVFp-rHFA",
    authDomain: "traintimehomework.firebaseapp.com",
    databaseURL: "https://traintimehomework.firebaseio.com",
    storageBucket: "traintimehomework.appspot.com",
    messagingSenderId: "785331922675"
  };
  firebase.initializeApp(config);
  
  // Create a variable to reference the database
  var database = firebase.database();


// Initial Values
var name = "";
var destination = "";

var time = 0;
var frequency = 0;




//Capture Button Click
$("#addTrain").on("click", function(e){
  e.preventDefault();

  //Grabbed values from text boxes
  name = $("#name").val().trim();
  destination = $("#destination").val().trim();
  time = $("#firstTrain").val().trim();
  frequency = parseInt($("#frequency").val().trim());///getting number from string
  console.log(time);


  //Code fro handling the push
  database.ref().push({
    name : name,
    destination : destination,
    time : time,
    frequency : frequency,
    dateAdded:firebase.database.ServerValue.TIMESTAMP
  })
  // contactForm.reset();//this rests the input form
  
  //Don't refresh the page!
  return false;
});

//Firebase watcher + initial loader

database.ref().on("child_added", function(childAdded){
  var name= childAdded.val().name;//pulling from database
  var destination = childAdded.val().destination;
  var frequency = childAdded.val().frequency;
  var time = childAdded.val().time;

  // First Time (pushed back 1 year to make sure it comes before current time)
  var timeConverted = moment(time,"HH:mm").subtract(1, "years");
  console.log(timeConverted);

  //Current Time
  var currentTime = moment();
  console.log("CURRENT TIME : " + moment(
    currentTime).format("hh:mm"));

  //Difference between the times
  var diffTime = moment().diff(moment(
    timeConverted),"minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  //Time apart(remainder)
  var tRemainder = diffTime % frequency;
  console.log(tRemainder);

  //Minutes Until Train
  var tMinutesTillTrain = frequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  //Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm A"));
  var nexttime = moment(nextTrain).format("hh:mm A");

  var oneRow = "<tr>";
  oneRow += "<td>" + name + "</td>";
  oneRow += "<td>" + destination + "</td>";
  oneRow += "<td>" + frequency + "</td>";
  oneRow += "<td>" + nexttime + "</td>";
  oneRow += "<td>" + tMinutesTillTrain + "</td>";

  oneRow += "</tr>";
  $("#TrainTable").append(oneRow);

//handle the errors
}, function(errorObject){

})















  function displayError(error) {
    // console.log(error);

  }
  //Firebase watcher + initial loader HINT: .on("value")
  database.ref().orderByChild("dateAdded").on("child_added", display, displayError);
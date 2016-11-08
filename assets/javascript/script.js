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
  // set up variables
  var name = "";
  var destination = "";
  var firstTrain = "";
  var frequency = "";
  var firstTimeConverted;
  var currentTime = moment();
  var diffTime;
  var tRemainder;
  var tMinutesTillTrain;
  var nextTrain;
  var nextArrival;
  // onclick to add employee
  $("#addTrain").on("click", function() {
    // Grabbed values from text boxes
    name = $('#name').val().trim();
    destination = $('#destination').val().trim();
    firstTrain = $('#firstTrain').val();
    frequency = $('#frequency').val().trim();
    firstTimeConverted = moment(firstTrain,"HH:mm");
    diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    tRemainder = diffTime % frequency;
    tMinutesTillTrain = frequency - tRemainder;
    nextTrain = moment().add(tMinutesTillTrain, "minutes");
    nextArrival = moment(nextTrain).format("hh:mm");
    // Code for handling the push
    database.ref().push({
        name: name,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        nextArrival: nextArrival,
        tMinutesTillTrain: tMinutesTillTrain,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      })
    console.log(firstTimeConverted);
      // Don't refresh the page!
    return false;
  });

  function display(childSnapshot) {
    var row = $("<tr>");
    row.append($("<td>").html(childSnapshot.val().name));
    row.append($("<td>").html(childSnapshot.val().destination));
    row.append($("<td>").html(childSnapshot.val().frequency));
    row.append($("<td>").html(childSnapshot.val().nextArrival));
    row.append($("<td>").html(childSnapshot.val().tMinutesTillTrain));
    $("#employeeTable").append(row);
     console.log(tRemainder);
     console.log(tMinutesTillTrain);
  }



  function displayError(error) {
    // console.log(error);

  }
  //Firebase watcher + initial loader HINT: .on("value")
  database.ref().orderByChild("dateAdded").on("child_added", display, displayError);
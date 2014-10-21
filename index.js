require('newrelic');
var express = require('express');
var Firebase = require('firebase');
var firebase_instance = new Firebase(process.env.FIREBASE_URL);
var app = express();

app.set('port', (process.env.PORT || 5000))
app.get('/', function(request, response) {
  response.send('The monster is awake!')
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})

firebase_instance.auth(process.env.FIREBASE_KEY, function() {
  firebase_instance.child('votes').child('none').on('value', function(data) {
    console.log(data.val());
  });
  firebase_instance.child('votes').child('pt').on('value', function(data) {
    console.log(data.val());
  });
  firebase_instance.child('votes').child('psdb').on('value', function(data) {
    console.log(data.val());
  });
});



    // var party = snap.val().party;
    // if(party === 'pt') {
    //   firebase_instance.child('counts').child('pt').transaction(function (current_value) {
    //     return (current_value || 0) + 1;
    //   });
    //   firebase_instance.child('counts').child('psdb').transaction(function (current_value) {
    //     return (current_value || 0) - 1;
    //   });
    // } else if(party === 'psdb') {
    //   firebase_instance.child('counts').child('psdb').transaction(function (current_value) {
    //     return (current_value || 0) + 1;
    //   });
    //   firebase_instance.child('counts').child('pt').transaction(function (current_value) {
    //     return (current_value || 0) - 1;
    //   });
    // }

  //   console.log(snap.val());


  // firebase_instance.child('votes').on('child_added', function(snap) {
  //   var party = snap.val().party;
  //   firebase_instance.child('counts').child(party).transaction(function (current_value) {
  //     return (current_value || 0) + 1;
  //   });
  //   firebase_instance.child('counts').child('total').transaction(function (current_value) {
  //     return (current_value || 0) + 1;
  //   });
  // });
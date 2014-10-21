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
  var find_and_remove = function(parties,vote_user_uid) {
    parties.forEach(function(party) {
      firebase_instance.child('votes').child(party).child(vote_user_uid).once('value', function(snapshot) {
        if(snapshot.val() !== null) {
          snapshot.ref().remove();
          firebase_instance.child('counts').child(party).transaction(function (current_value) {
            return (current_value || 0) - 1;
          });
        }
      });
    });
  };

  firebase_instance.child('votes').child('none').on('child_added', function(vote) {
    var vote_user_uid = vote.name();
    firebase_instance.child('counts').child('none').transaction(function (current_value) {
      return (current_value || 0) + 1;
    });
    find_and_remove(['pt','psdb'], vote_user_uid);
  });

  firebase_instance.child('votes').child('pt').on('child_added', function(vote) {
    var vote_user_uid = vote.name();
    firebase_instance.child('counts').child('pt').transaction(function (current_value) {
      return (current_value || 0) + 1;
    });
    find_and_remove(['none','psdb'], vote_user_uid);
  });

  firebase_instance.child('votes').child('psdb').on('child_added', function(vote) {
    var vote_user_uid = vote.name();
    firebase_instance.child('counts').child('psdb').transaction(function (current_value) {
      return (current_value || 0) + 1;
    });
    find_and_remove(['none','pt'], vote_user_uid);
  });
});
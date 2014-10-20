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
  firebase_instance.child('votes').on('value', function(snap) {
    console.log(snap.val());
  });
});
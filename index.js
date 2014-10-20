var express = require('express');
var Firebase = require('firebase');
var firebaseInstance = new Firebase(process.env.FBURL);
var app = express();

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  response.send('The monster is awake!')
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})

firebaseInstance.auth( process.env.FIREBASE_KEY, function() {
   firebaseInstance.child('votes').on('child_changed', function(childSnapshot, prevChildSiblingName) {
      // firebaseInstance.child('changes_count').set( snap.numChildren() );
      console.log(childSnapshot);
   })
}
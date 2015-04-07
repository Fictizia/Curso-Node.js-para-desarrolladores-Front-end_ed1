var server = require('server'),
    router = require("router"),
    handler = require("request_handler"),
    fs = require("fs"),
    Firebase = require("firebase");

fs.readFile('routes.json', 'utf8', function (poError, poData) {
    if(poError){
        throw poError;
    }
    console.log(poData);
    server.start(router.route, handler.handle, JSON.parse(poData));
});

(function testFireBase() {
    var myFirebase = new Firebase("https://node-test-jc.firebaseio.com/books");
    
    /*
    myFirebase.push({
        title: "Hello World!",
        author: "Firebase",
        location: {
            city: "San Francisco",
            state: "California",
        zip: 94103
        }
    });*/
    
    var count = 0;
    
    myFirebase.on("child_added", function(snap) {
      count++;
      console.log("added", snap.key());
    });
    
    myFirebase.once("value", function(snap) {
  console.log("initial data ("+ count +") loaded!", Object.keys(snap.val()).length === count);
});
    

    
})();


var Firebase = require("firebase");

(function testFirebase () {
    var oMiBBDD = new Firebase("https://fictizia-node.firebaseio.com/books");
    /*
    oMiBBDD.push({
      title: "Hello World!",
      author: "Firebase",
      location: {
        city: "San Francisco",
        state: "California",
        zip: 94103
      }
    });*/
    
    var count = 0;
    oMiBBDD.on("child_added", function(poSnapshot) {
      count++;
      console.log("added", poSnapshot.key());
    });
    
    oMiBBDD.once('value', function(poSnapshot) {
      console.log("initial data (" + count + ") loaded!", Object.keys(poSnapshot.val()).length === count);
    });
})();
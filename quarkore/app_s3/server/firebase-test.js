
var Firebase = require("firebase");


(function testFirebase(){
    var BDFB = new Firebase('https://node-test-q.firebaseio.com/test-node');
    
    var count = 0;
    BDFB.on('child_added', function(snap){
       count++;
       console.log('added', snap.key());
    });
    
    BDFB.once(function(snap){
        console.log('initial data ' + count + ' loaded', Object.keys(snap.val()).length === count);    
    });
    
})();
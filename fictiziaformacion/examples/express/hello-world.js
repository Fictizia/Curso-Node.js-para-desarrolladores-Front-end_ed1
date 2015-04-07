// hello-world.js
var express = require('express'),
    app = express();

app.get('/', function (poRequest, poResponse) {
    poResponse.send('Hello World!');
});

var server = app.listen(process.env.PORT, function () {
    var host = server.address().address,
        port = server.address().port;
    
    console.log('Example app listening at http://%s:%s', host, port);
});
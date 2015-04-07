// static-server.js
var express = require("express"),
    app = express();

app.use(express.static('../client'));

var server = app.listen(process.env.PORT, function () {
    var host = server.address().address,
        port = server.address().port;
    
    console.log('Example app listening at http://%s:%s', host, port);
});
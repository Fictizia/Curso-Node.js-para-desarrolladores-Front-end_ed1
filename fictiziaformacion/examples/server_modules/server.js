// server.js
var http = require("http");

function serverStart (pfRoute, pfHandle, pJSON_Paths) {
    console.log('Server started');
    http.createServer(function (request, response) {
        console.log('Server request received ' + request.url);
        pfRoute(request.url, pfHandle, pJSON_Paths, response);
    }).listen(process.env.PORT, process.env.IP);
}

exports.start = serverStart;
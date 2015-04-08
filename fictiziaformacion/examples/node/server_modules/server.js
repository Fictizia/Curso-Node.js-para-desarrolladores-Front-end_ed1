// server.js
var http = require("http"),
    fs = require("fs");

function serverStart (pfRoute, pfHandle, pJSON_Paths) {
    console.log('Server started on', process.env.IP + ':' + process.env.PORT);
    http.createServer(function (poRequest, poResponse) {
        logRequest(poRequest);
        pfRoute(poRequest, pfHandle, pJSON_Paths, poResponse);
    }).listen(process.env.PORT, process.env.IP);
}

function logRequest (poRequest) {
    var dToday = new Date(),
        cToday = dToday.getMonth() + '-' + dToday.getDate() + '-' + dToday.getFullYear(),
        cData = '\nServer ' + poRequest.method + ' request received ' + poRequest.url + '\n' + JSON.stringify(poRequest.headers);
    
    console.log('\nServer ' + poRequest.method + '  request received ' + poRequest.url);
    
    // don't forget to create 'logs' folder!!!
    fs.appendFile('logs/log_' + cToday + '.txt', cData, function (poError) {
        if (poError) {
            throw poError;
        }
    });
}

exports.start = serverStart;
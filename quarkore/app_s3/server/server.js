//server
var http = require("http");
var fs = require("fs");



function serverStart(routeUrl, handler, JSON_paths){
    http.createServer(function(request, response) {
        console.log('JSON:   ' , JSON_paths);
        
        
        //router
        //routeUrl(request, response);
        console.log(request.url);
        routeUrl(request, handler, JSON_paths, response);
        logReq(request);
        
        
        
        
    }).listen(process.env.PORT, process.env.IP);
    console.log("Server started...");
}

function logReq (req){
    var lToday = new Date(),
        cToday = lToday.getMonth() + '-' + lToday.getDate() + '-' + lToday.getFullYear(),
        cData = '\nServer ' + req.method + ' request method ' + req.url + '\n' + JSON.stringify(req.headers);
        
        console.log('\nServer ' + req.method + ' request method ' + req.url + '\n');
        
        //crear carpeta (no olvidar)
        fs.appendFile('logs/log_' + cToday + '.txt', cData, function(err){
            if (err){
                throw err;
            }
        });
}

exports.start = serverStart;



    
    
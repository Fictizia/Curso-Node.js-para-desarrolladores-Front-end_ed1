//app.js
//main app file.
var server = require('server');
var router = require('router');
var fs = require("fs");
var handler = require("request_handler");
var JSON_paths = {};


fs.readFile('routes.json', 'utf-8', function(error, data){
    if(error){
        console.log('error');
        throw error;
    }
    JSON_paths = data;
    console.log('Checking all routes available: ' +data);
    server.start(router.route, handler.handle, JSON.parse(data));
});
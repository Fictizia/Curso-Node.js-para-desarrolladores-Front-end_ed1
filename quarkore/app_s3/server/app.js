//app.js
//main app file.
var server = require('server');
var router = require('router');
var handler = require("request_handler");
var appConfig = require("app-config");

process.title = 'Mi web server';

server.start(router.route, handler.handle, appConfig.routes);
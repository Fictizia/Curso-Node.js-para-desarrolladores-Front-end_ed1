// app.js
var server = require("server"),
    router = require("router"),
    handler = require("request_handler"),
    appConfig = require("app-config");

process.title = 'Web Server App';

server.start(router.route, handler.handle, appConfig.routes);
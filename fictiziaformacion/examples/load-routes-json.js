// app.js
var server = require("server"),
    router = require("router"),
    handler = require("request_handler"),
    fs = require("fs");

fs.readFile('routes.json', 'utf8', function (poErr, poData) {
    if (poErr) {
        throw poErr;
    }

    server.start(router.route, handler.handle, JSON.parse(poData));
});
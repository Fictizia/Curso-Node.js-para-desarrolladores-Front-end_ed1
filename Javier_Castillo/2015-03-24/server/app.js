var server = require('server'),
    router = require("router"),
    handler = require("request_handler"),
    fs = require("fs");

fs.readFile('routes.json', 'utf8', function (poError, poData) {
    if(poError){
        throw poError;
    }
    console.log(poData);
    server.start(router.route, handler.handle, JSON.parse(poData));
})



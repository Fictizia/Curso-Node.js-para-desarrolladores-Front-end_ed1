// request-handlers.js
function a_donde_vas(response) {
    console.log("Handler for request 'a_donde_vas' dispatched.");
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("Patatas traigo");
    response.end();
}
function disimula_disimula(response) {
    console.log("Handler for request 'disimula_disimula' dispatched.");
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("Y la mula dijo si");
    response.end();
}
exports.a_donde_vas = a_donde_vas;
exports.disimula_disimula = disimula_disimula;

// server.js
var http = require("http");
var url = require("url");
function serverStart(route, handler) {
    http.createServer(function(request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log("Received petition for " + pathname);
        route(handler, pathname, response);
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("¿Que pasa tronco?");
        response.end();
    }).listen(4444);
    console.log("Server started...");
}
exports.start = serverStart;

// router.js
function route(handler, pathname, response) {
    console.log("Routing a new petition for" + pathname);
    if (typeof handler[pathname] === 'function') {
        handler[pathname](response);
    } else {
        console.log("No request handler for " + pathname + " skipping");
        response.writeHead(404, {"Content-Type": "text/html"});
        response.write("404 Not Found");
        response.end();
    }
}
exports.route = route;

// app.js
var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");
var handler = {}
handler["/"] = requestHandlers.a_donde_vas;
handler["/a_donde_vas"] = requestHandlers.a_donde_vas;
handler["/disimula_disimula"] = requestHandlers.disimula_disimula;
server.start(router.route, handler);
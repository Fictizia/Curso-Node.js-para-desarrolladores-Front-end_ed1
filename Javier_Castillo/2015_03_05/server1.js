var http = require("http");

http.createServer(function(request, response){
    response.writeHead(200,{"Content-Type": "text/plain"});
    response.write("Hola mundo");
    response.end();
}).listen(process.env.PORT, process.env.IP); //8888
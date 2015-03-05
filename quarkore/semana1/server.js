// llamada a módulo 'http' de node
var http = require("http");

http.createServer(function (request, response){
    console.log('TEST');
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write('Hola');
    response.end();
}).listen(process.env.PORT, process.env.IP);        //Puerto definido por la máquina virtual.
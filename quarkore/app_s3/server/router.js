//router.js
var fs = require("fs");
var url = require("url");
var path = require("path");
var mymeTypes = {
    "html": "text/html",
    "jpeg": "image/jpeg",
    "js": "text/javascript",
    "css": "text/css"
};


function route(request, handler, JSON_paths, response){
    
    //logging
    console.log('log: requested URL : ' , request.url);
    
    //Routing variables
    var pathname = url.parse(request.url).pathname;
    var extension = path.extname(pathname);
    var fileMymeType = mymeTypes[extension.replace('.', '')];
    var staticFileUrl = '../client' + pathname;
    var LecturaStream = {};
    var handleRes = handler(pathname, JSON_paths);
    
    
    console.log('request URL pathname: ' , staticFileUrl);
    console.log('File extension: ', extension);
    console.log('mymeType requested: ', fileMymeType);
    
    
    if (fileMymeType){
        
        console.log('File requested: ', path.basename(pathname));
        
        fs.exists(staticFileUrl, function(fileExists){
            
            console.log('Checking if file exists...');
            
            if(fileExists){
            
                console.log('File exists. Loading file...');
            
                returnStatic(extension, staticFileUrl, response, fileMymeType);    
            }
            else{
                
                console.log('File not found. Returning response...');
                
                noFileFound(response, staticFileUrl);
            }
        });
    }
    else{
        
        console.log('Route requested: ', pathname);
        
        if (!handleRes){
            
            console.log('Route not found. Returning 404...');
            noRouteFound(response);
       
        }else{
            //llamada a METODO DENTRO DE NUESTRO HANDLER
            console.log('Route found. Routing...');
            if(request.method == 'POST'){
                handleRes(response,request);
            }
            else{
                handleRes(response,fs);
            }
            
        }
    }
    
    
    
    
        console.log("Received petition for " + pathname);
        
}

function noRouteFound (response){
    
    var LecturaStream = {};
    
    console.log('404 return.');
    
    response.writeHead(404, {'Content-Type': 'text/html'});
    LecturaStream = fs.createReadStream('../html/404.html');
    LecturaStream.pipe(response);
    
}

function noFileFound (response, staticFileUrl){
    
    console.log('File not found return.', staticFileUrl);
    
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.write('File not found.');
    response.end();
}

function returnStatic (folder, staticFileUrl, response, fileMymeType) {
    
    console.log('RUTA DE STATIC:       ' + staticFileUrl); // ../client' + folder +
    
    response.writeHead(200, {"Content-Type": fileMymeType});
    var clientStream = fs.createReadStream(staticFileUrl); // '../client/'+ folder + '/' + 
    
    
    
    clientStream.pipe(response);
    
}

exports.route = route;
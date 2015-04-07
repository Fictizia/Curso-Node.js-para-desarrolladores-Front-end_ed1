//route handler
//Manejador de rutas, comprueba JSON donde se configuran las mismas.
var Firebase = require("firebase");
var qs = require("querystring");

function handleRoute(routerUrl, JSON_paths){
    var routeIsValid = false;
    //console.log('jsonpath:B ' , JSON_paths);
    //console.log('routeURL: ' , routerUrl);
    
    
    if (JSON_paths[routerUrl]
        && typeof eval(JSON_paths[routerUrl]) === 'function'){
        routeIsValid = eval(JSON_paths[routerUrl]);
        console.log('Ruta: ' + routerUrl);
        
    }
    return routeIsValid;
    
}

//
//Página de inicio
//---------------------------------------

function responseHome(response, fs){
    
    //Logging
    console.log('-----------------------------------------------------------------------------');
    console.log('log: Homepage request responded......');
    
    //request Template
    var clientStream = fs.createReadStream('../client/index.html');
    
    //header response
    response.writeHead(200, {"Content-Type": "text/html"});
    clientStream.pipe(response);
}

//
//Página de Prueba
//---------------------------------------

function responseHola(response, fs){
    
    //Logging
    console.log('-----------------------------------------------------------------------------');
    console.log('log: Test Page request responded......');
    
    //request template
    var clientStream = fs.createReadStream('../html/hola.html');
    
    //header response
    response.writeHead(200, {"Content-Type": "text/html"});
    clientStream.pipe(response);
}

//
//POST Form actions
//---------------------------------------

function responseSubmit(response, request){
    
    var BD_contacto_test = new Firebase('https://node-test-q.firebaseio.com/contacto');
    var contactJSON = {};
    
    //Logging  
    console.log('-----------------------------------------------------------------------------');
    console.log('log: Form Submitted.........');
    
    if(request.method == 'POST'){
        request.body = '';
        request.addListener('data', function(reqChunk){
            request.body = request.body + reqChunk;
            console.log('log: Chunk of data received: ', reqChunk);
        })
        .addListener('end', function(){
            var JSON_chunks = JSON.stringify(qs.parse(request.body));
            
            contactJSON = qs.parse(request.body);
            
            console.log('JSON DATA REQUESTED TO BE PUSHED TO DB:  ', contactJSON);
            
            BD_contacto_test.push(contactJSON);
            
            
            
            console.log('POST REQ: ', JSON_chunks);
            response.writeHead(200, {"Content-Type": "text/html"});
            response.end(JSON_chunks);
        });
    }
    
    
    
    
    //request template
    //var clientStream = fs.createReadStream('../html/hola.html');
    
    //header response
    
    //clientStream.pipe(response);
}

//
//Página de Información
//---------------------------------------

function responseAbout(response, fs){
    
    //Logging
    console.log('-----------------------------------------------------------------------------');
    console.log('log: About Page request responded......');
    
    //request template
    var clientStream = fs.createReadStream('../html/about.html');
    
    //header response
    response.writeHead(200, {"Content-Type": "text/html"});
    clientStream.pipe(response);
}

//
//Página de Contacto
//---------------------------------------

function responseContact(response, fs){
    
    //Logging
    console.log('-----------------------------------------------------------------------------');
    console.log('log: Contact Page request responded......');
    
    //request template
    var clientStream = fs.createReadStream('../html/contact.html');
    
    //header response
    response.writeHead(200, {"Content-Type": "text/html"});
    clientStream.pipe(response);
}

//
//Página de Artículo
//---------------------------------------

function responseArticle(response, fs){
    
    //Logging
    console.log('-----------------------------------------------------------------------------');
    console.log('log: Article Page request responded......');
    
    //request template
    var clientStream = fs.createReadStream('../html/article.html');
    
    //header response
    response.writeHead(200, {"Content-Type": "text/html"});
    clientStream.pipe(response);
}

//
//Página de Búsqueda
//---------------------------------------

function responseSearch(response, fs){
    
    //Logging
    console.log('-----------------------------------------------------------------------------');
    console.log('log: Search Page request responded......');
    
    //request template
    var clientStream = fs.createReadStream('../html/search.html');
    
    //header response
    response.writeHead(200, {"Content-Type": "text/html"});
    clientStream.pipe(response);
}
//exports...
exports.handle = handleRoute;
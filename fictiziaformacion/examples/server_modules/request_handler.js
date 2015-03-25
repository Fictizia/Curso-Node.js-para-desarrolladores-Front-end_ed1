// request_handler.js
var qs = require("querystring"),
    fs = require("fs");

function handleRoute (pcPathname, pJSON_Paths) {
    var bRouteExists = false;
    
    if (pJSON_Paths[pcPathname] 
        && typeof eval(pJSON_Paths[pcPathname]) === "function") {
        bRouteExists = eval(pJSON_Paths[pcPathname]);
        console.log('Existe la ruta ' + pcPathname);
    }
    
    return bRouteExists;
}

function responseHome (poResponse) {
    var oStream = fs.createReadStream('../client/index.html');
    
    poResponse.writeHead(200, {"Content-Type": "text/html"});
    oStream.pipe(poResponse);
}

function responseSearch (poResponse, poRequest) {
    if (poRequest.method == 'POST') {
        poRequest.body = '';
        poRequest.addListener('data', function (poChunk) {
            poRequest.body = poRequest.body + poChunk;
        })
        .addListener('end', function () {
            var oJSON = JSON.stringify(qs.parse(poRequest.body));
            
            console.log('POST request:', oJSON);
            poResponse.end(oJSON);
        });
    } else {
        var oStream = fs.createReadStream('../client/search.html');
    
        poResponse.writeHead(200, {"Content-Type": "text/html"});
        oStream.pipe(poResponse);
    }
}

exports.handle = handleRoute;
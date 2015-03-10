// request_handler.js
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
    poResponse.writeHead(200, {"Content-Type": "text/plain"});
    poResponse.write("HOME");
    poResponse.end();
}

function responseSearch (poResponse) {
    poResponse.writeHead(200, {"Content-Type": "text/plain"});
    poResponse.write("SEARCH");
    poResponse.end();
}

exports.handle = handleRoute;
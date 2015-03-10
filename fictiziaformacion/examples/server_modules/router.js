// router.js
var url = require("url");

function routeURL (pcURL, pfHandle, pJSON_Paths, poResponse) {
    var fRouteHandler = pfHandle(url.parse(pcURL).pathname, pJSON_Paths);
    
    if (!fRouteHandler) {
        poResponse.writeHead(404, {"Content-Type": "text/plain"});
        poResponse.write("URL not found: " + pcURL);
        poResponse.end();
    } else {
        fRouteHandler(poResponse);
    }
}

exports.route = routeURL;
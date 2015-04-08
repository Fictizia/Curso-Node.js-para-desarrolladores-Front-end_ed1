// router.js
var url = require("url"),
    path = require("path"),
    fs = require("fs"),
    goMimeTypes = {
        "html": "text/html",
        "jpeg": "image/jpeg",
        "jpg": "image/jpeg",
        "png": "image/png",
        "js": "text/javascript",
        "css": "text/css"};

function routeURL (poRequest, pfHandle, pJSON_Paths, poResponse) {
    var cURL = poRequest.url,
        cPathname = url.parse(cURL).pathname,
        cStaticFileExtension = path.extname(cPathname),
        cStaticFileMimeType = goMimeTypes[cStaticFileExtension.replace('.', '')],
        cStaticFileURL = '../client' + cPathname;
    
    console.log('Pathname ' + cPathname, 'Extension: ' + path.extname(cPathname));
    
    if (cStaticFileMimeType) {
        console.log('Sirviendo archivo estatico ', cStaticFileURL);
        fs.exists(cStaticFileURL, function (pbFileExists) {
          if (pbFileExists) {
              serveStaticFile(poResponse, cStaticFileURL, cStaticFileMimeType);
          } else {
              fileNotFound(poResponse, cStaticFileURL);
          }
        });
        
    } else {
        var fRouteHandler = pfHandle(url.parse(cURL).pathname, pJSON_Paths);
        
        if (!fRouteHandler) {
            routeNotFound(poResponse);
        } else {
            fRouteHandler(poResponse, poRequest);
        }
    }
}

function serveStaticFile (poResponse, pcStaticFileURL, pcStaticFileMimeType) {
    var oStream = {},
        oBody;
    
    poResponse.writeHead(200, {"Content-Type": pcStaticFileMimeType});
    oStream = fs.createReadStream(pcStaticFileURL);
    oStream.pipe(poResponse);
}

function routeNotFound (poResponse) {
    var oStream = {};
    
    poResponse.writeHead(404, {"Content-Type": "text/html"});
    oStream = fs.createReadStream('../client/404.html');
    oStream.pipe(poResponse);
}

function fileNotFound (poResponse, pcStaticFileURL) {
    poResponse.writeHead(404, {"Content-Type": "text/plain"});
    poResponse.write("File not found: " + pcStaticFileURL);
    poResponse.end();
}

exports.route = routeURL;
// static-server.js
var express = require("express"),
    app = express();

app.use(express.static('../client'));

app.get('/search', function (poRequest, poResponse) {
    var cFilename = 'search.html',
        oOptions = {
            root: __dirname + '/../client/',
            dotfiles: 'deny',
            headers: {
                'x-timestamp': Date.now(),
                'x-sent': true
            }
        };
    
    poResponse.sendFile(cFilename, oOptions, function (poError) {
        if (poError) {
            console.log(poError);
            poResponse.status(poError.status).end();
        } else {
            console.log('Sent:', cFilename);
        }
    });
});

app.get('/new', function (poRequest, poResponse) {
    var cFilename = 'new.html',
        oOptions = {
            root: __dirname + '/../client/',
            dotfiles: 'deny',
            headers: {
                'x-timestamp': Date.now(),
                'x-sent': true
            }
        };
    
    poResponse.sendFile(cFilename, oOptions, function (poError) {
        if (poError) {
            console.log(poError);
            poResponse.status(poError.status).end();
        } else {
            console.log('Sent:', cFilename);
        }
    });
});

app.use(function(poRequest, poResponse, pfNext) {
    poResponse.status(404).send('Sorry cant find that!');
});

var server = app.listen(process.env.PORT, function () {
    var host = server.address().address,
        port = server.address().port;
    
    console.log('Example app listening at http://%s:%s', host, port);
});
var fs = require("fs");
var http = require("http");
var path = require("path");



    console.log('TEST');
    
    fs.readdir(process.argv[2], function(error, result){
        if(error){
            console.log(error);
            throw error;
        }
        else{
            console.log('no errors.');
        }
        result.forEach(function(item){
            if (path.extname(item) === '.' + process.argv[3]){
                console.log('archivo: ' + path.basename(item));
                var fileName = process.argv[3] + '/' + path.basename(item) + '\n';
                console.log(fileName);
                //escritura
                fs.writeFile('salida.appcache', fileName, function(err){
                    if (err){
                        console.log(err);
                    }
                });
            }
        });
    });
    
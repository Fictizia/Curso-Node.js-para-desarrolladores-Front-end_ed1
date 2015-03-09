var fs = require("fs");
var http = require("http");
var path = require("path");



    console.log('TEST');
    
    var LeeDir = function(dirname){
        fs.readdir(dirname, function(error, result){
            if(error){
                console.log(error);
                throw error;
            }
            else{
                console.log('no errors.');
            }
            result.forEach(function(item){
                if (path.extname(item)){
                    var fileName = path.basename(item);
                    console.log('to write: ' + fileName);
                    fs.writeFile('salida.appcache', fileName, function(err){
                        if (err){
                            console.log(err);
                        }
                        else{
                            console.log('written: ' + fileName);
                        }
                    });
//                    fs.writeFile('\n');
                }
                else{
                    console.log('to read: ' + path.resolve(item));
                    LeeDir(path.resolve(item));
                }
            })
        });
    }
    LeeDir(path.normalize(process.argv[2]) );
    
    /*
    var archivo = path.dirname(process.argv[2]);
    archivo.forEach(function(item){
        fs.readdir(item, function(error, result){
            if (error){
                console.log(error);
                throw error;
            }
            else{
                console.log('no errors read.');
            }
            result.forEach(function(content){
                console.log('loop');
                var fileName = path.basename(content);
                fs.writeFile('salida.appcache', fileName);
            })
        });
    });
    */
    
    /*
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
            console.log(path.basename(item));
        });
    });
    */
    /*
    fs.readdir(process.argv[2], function(error, result){
        if(error){
            console.log(error);
            throw error;
        }
        else{
            console.log('no errors.');
        }
        result.forEach(function(item){
            if(path.extname(item)){
                console.log(path.dirname(item));
                console.log(path.resolve(item));
                console.log(path.basename(item));
            }
            else{
                
                var folderName = path.resolve(item);
                
                console.log('folder found: ' + path.resolve(folderName));
                fs.readdir(folderName, function(error, result){
                    if(error){
                        console.log(error);
                        throw error;
                    }
                    else{
                        console.log('no errors. Level 2....');
                    }
                });
            }
        });
    });*/
    
    
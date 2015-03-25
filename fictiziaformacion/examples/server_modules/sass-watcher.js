var sass = require('node-sass'),
    fs = require("fs"),
    gcSASS_FILES_LOCATION = '../../client/sass/',
    gcCSS_FILES_LOCATION = '../../client/css/';
    
console.log(sass.info());

fs.watch(gcSASS_FILES_LOCATION, function (poEvent, pcFilename) {
    console.log('event is: ' + poEvent);
    if (pcFilename) {
        console.log('filename provided: ' + pcFilename);
        
        var oResult = sass.renderSync({
          file: gcSASS_FILES_LOCATION + pcFilename,
          outputStyle: 'compressed'
        });
        
        fs.writeFile(gcCSS_FILES_LOCATION + pcFilename.replace('scss', 'css'), oResult.css, 'utf8', function (poError) {
            if (poError) {
                throw poError;
            }
        });
        
        console.log(pcFilename.replace('scss', 'css') + ' compiled!');
    } else {
        console.log('filename not provided');
    }
});
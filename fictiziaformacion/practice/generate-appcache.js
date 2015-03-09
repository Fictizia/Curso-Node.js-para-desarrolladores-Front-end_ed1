var fs = require('fs'),
    path = require('path');

fs.readdir(process.argv[2], function (poError, poList) {
    poList.forEach(function (poItem) {
        if (path.extname(poItem) === '.' + process.argv[3]) {
            console.log(path.basename(poItem));
        }
    });
});
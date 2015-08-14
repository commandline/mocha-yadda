var Promise = require('bluebird');
var http = require('http');
var fs = require('fs');

var httpLoad = function(url) {
    return new Promise(function(resolve, reject) {
        http.get(url, function(response) {
            var data = '';

            response.on('data', function(buf) {
                data += buf;
            });

            response.on('end', function() {
                try {
                    resolve(data);
                } catch(err) {
                    reject(err);
                }
            });
        }).on('error', function(err) {
            reject(err);
        });
    });
};

var fileLoad = function(path) {
    return new Promise(function(resolve, reject) {
        fs.readFile(path, function(err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data.toString());
            }
        });
    });
};

module.exports = {
    http: {
        load: httpLoad
    },
    file: {
        load: fileLoad
    }
};

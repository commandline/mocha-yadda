var Promise = require('bluebird');
var http = require('http');

var httpLoad = function(path) {
    return new Promise(function(resolve, reject) {
        http.get(window.location.origin + '/base/test/application/features/' + path, function(response) {
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

module.exports = {
    http: {
        load: httpLoad
    },
    file: {
        load: undefined
    }
};

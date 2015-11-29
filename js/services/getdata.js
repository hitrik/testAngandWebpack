var db = require('../vendor/moviedb');

module.exports = angular.module("Services", [])
      .factory('getData', [function() {
        var wrapperAPI = function(cat, fnName, options, callback) {
            options = options || {};
            db[cat][fnName](options, function(result) {
                return callback(JSON.parse(result));
            }, function(err) {
                console.log('err', err);
            });
        };
        return {
            wrapperAPI: wrapperAPI
        };
    }]);
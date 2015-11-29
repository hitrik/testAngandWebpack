var db = require('../vendor/moviedb');

module.exports = angular.module("Controllers", [])
.controller("MainCtrl", ["$rootScope", "getData", function($rootScope) {
        $rootScope.$on('loadPage', function() {
            console.log('page is loaded');
        });
    }])
    .controller('searchController', ['$scope', 'getData', '$location', '$routeParams', function($scope, getData, $location, $routeParams) {
        var query = $routeParams.query || '';
        $scope.img_uri150 = db.common.images_uri150;
        $scope.showOnSearch = function() {
            getData.wrapperAPI('search', 'getMovie', { query: query }, function(data) {
                if(data.results) {
                    $scope.$apply(function() {
                        $scope.searchRes = data.results;
                        $location.hash(query);
                    });
                    console.log($scope.searchRes, $location);
                }
            });
        };
    }]);
var db = require('../vendor/moviedb');

module.exports = angular.module("Controllers", [])
.controller("MainCtrl", ["$rootScope", "getData", function($rootScope) {
        $rootScope.img_uri150 = db.common.images_uri150;
        $rootScope.$on('loadPage', function() {
            console.log('page is loaded');
        });
    }])
    .controller('searchController', ['$scope', 'getData', '$location', function($scope, getData, $location) {
        $scope.showOnSearch = function(query) {
            getData.wrapperAPI('search', 'getMovie', { query: query }, function(data) {
                if(data.results) {
                    $scope.$apply(function() {
                        $scope.searchRes = data.results;
                        console.log("searchRes ", $scope.searchRes[0]);
                    });
                }
            });
        };
    }])
    .controller('nowMovieController', ['$scope', 'getData', function($scope, getData) {
            getData.wrapperAPI('movies', 'getNowPlaying', {}, function(data) {
                $scope.$apply(function() {
                    this.nowMovies = data.results;
                    console.log("nowMovie ", data.results);
                }.bind(this));
            }.bind(this));
    }]);
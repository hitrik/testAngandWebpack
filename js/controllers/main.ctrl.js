var db = require('../vendor/moviedb');

module.exports = angular.module("Controllers", [])
.controller("MainCtrl", ["$rootScope", "getData", function($rootScope) {
        $rootScope.$on('loadPage', function() {
            console.log('page is loaded');
        });
    }])
    .controller('searchController', ['$scope', 'getData', '$location', function($scope, getData, $location) {
        $scope.img_uri150 = db.common.images_uri150;
        $scope.showOnSearch = function(query) {
            getData.wrapperAPI('search', 'getMovie', { query: query }, function(data) {
                if(data.results) {
                    $scope.$apply(function() {
                        $scope.searchRes = data.results;
                        console.log($scope.searchRes[0].id);
                    });
                }
            });
        };
    }])
    .controller('nowMovieController', ['$scope', 'getData', function($scope, getData) {
        this.showMovies = function() {
            getData.wrapperAPI('movies', 'getNowPlaying', {}, function(data) {
                $scope.$apply(function() {
                    this.nowMovies = data.results;
                    console.log(data.results);
                }.bind(this));
            }.bind(this));
        };
    }]);
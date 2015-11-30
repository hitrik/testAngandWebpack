var db = require('../vendor/moviedb');

module.exports = angular.module("Controllers", [])
.controller("MainCtrl", ["$rootScope", "getData", function($rootScope) {
        $rootScope.img_uri150 = db.common.images_uri150;
        $rootScope.$on('loadPage', function() {
            console.log('page is loaded');
        });
    }])
    .controller('searchController', ['$scope', 'getData', '$routeParams', function($scope, getData, $routeParams) {
        var q = $routeParams.query || "";
        if(q == '') return;
            getData.wrapperAPI('search', 'getMovie', { query: q }, function(data) {
                if(data.results) {
                    $scope.$apply(function() {
                        $scope.searchRes = data.results;
                        console.log("searchRes ", $scope.searchRes);
                    });
                }
            });
    }])
    .controller('nowMovieController', ['$scope', 'getData', function($scope, getData) {
            getData.wrapperAPI('movies', 'getNowPlaying', {}, function(data) {
                $scope.$apply(function() {
                    this.nowMovies = data.results;
                    console.log("nowMovie ", data.results);
                }.bind(this));
            }.bind(this));
    }])
    .controller('soonController', ['$scope', 'getData', function($scope, getData) {
        getData.wrapperAPI('movies', 'getUpcoming', {}, function(data) {
            $scope.$apply(function() {
                $scope.soonMovies = data.results;
                console.log("soonMovie ", data.results);
            });
        });
    }])
    .controller('mainPageController', ['getData', function(getData) {
        this.title = 'Welcome on main page of Film DB!';
    }])
    .controller('itemFilmController', ['$rootScope', '$routeParams', 'getData', function($rootScope, $routeParams, getData) {
        var idFilm = $routeParams.id || "";
        console.log($routeParams, idFilm);
        if(idFilm == "") return;
        getData.wrapperAPI('movies', 'getById', {id: idFilm}, function(data) {
            if(data) {
                console.log(data);
                $rootScope.$on('clickFilm', function(data) {
                    console.log("catch event ----- ", data)
                });
            }
        });
    }]);
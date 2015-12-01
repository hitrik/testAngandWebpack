var db = require('../vendor/moviedb');

module.exports = angular.module("Controllers", [])
.controller("MainCtrl", ["$rootScope", '$location', function($rootScope, $location) {
        $rootScope.img_uri150 = db.common.images_uri150;
        $rootScope.$on('loadPage', function() {
            console.log('page is loaded');
        });
        $rootScope.$on('clickFilm', function(ev, data) {
            if(!angular.isUndefined(data)) {
                $rootScope.$apply(function() {
                    $location.path('film/' + data);
                });
            } else {
                return false;
            //    TODO Notify error happened
            }
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
    .controller('itemFilmController', ['$scope', '$routeParams', 'getData', function($scope, $routeParams, getData) {
        var idFilm = $routeParams.id || "";
        console.log($routeParams, idFilm);
        if(idFilm == "") return;
        getData.wrapperAPI('movies', 'getById', {id: idFilm}, function(data) {
            if(data) {
                $scope.$apply(function() {
                    $scope.film = data;
                    $scope.bgFilm = {
                        'background': '#fff url(' + ($scope.img_uri150 + data.backdrop_path) + ')',
                        'background-size': 'cover'
                    };
                    console.log(data);
                });
            }
        });
    }]);
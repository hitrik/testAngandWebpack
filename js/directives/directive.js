var db = require('../vendor/moviedb');

module.exports = angular.module('Directives', [])
.directive("searchWidget", ['$location', '$rootScope', function($location, $rootScope) {
        return {
            restrict: "E",
            replace: true,
            templateUrl: './js/templates/search.tpl.html',
            link: function(scope, elem) {
                var btn = elem.find('button'),
                    input = elem.find('input');
                btn.on('click', function(e) {
                    e.preventDefault();
                    var query = input.val();
                    if(query.trim()) {
                        //scope.showOnSearch(query);
                        $rootScope.$apply(function() {
                            $location.path('/search/' + query);
                        });
                    }
                });
            }
        };
    }])
.directive('loadPage', ['$rootScope', function($rootScope) {
        return {
            restrict: "A",
            link: function() {
                $rootScope.$broadcast("loadPage");
            }
        };
    }])
.directive('topMenu', [function() {
        return {
            restrict: "E",
            replace: true,
            controller: function() {
                console.log('init Menu');
            },
            templateUrl: './js/templates/menu.tpl.html',
            controllerAs: "menu",
            link: function(scope, elem) {

            }
        };
    }])
.directive('showMovies', [function() {
        return {
            restrict: "E",
            replace: true,
            template: [
                '<div>',

            ].join(''),
            link: function(scope, elem) {

            }
        };
}])
.directive('clickFilm', ['$rootScope', function($rootScope) {
        return {
            restrict: "A",
            link: function(scope, elem) {
                elem[0].addEventListener('click', function(e) {
                    if(e.target.tagName == "IMG" && e.target.getAttribute('data-id')) {
                        var id = e.target.getAttribute('data-id');
                        $rootScope.$emit('clickFilm', id);
                    }
                }.bind(elem[0]), false);
            }
        };
    }])
.directive('showTrailer', ['$document', 'getData', function($document, getData) {
        return {
            restrict: 'E',
            replace: true,
            controller: function() {
                console.log('arguments', arguments);
            },
            controllerAs: 'vm',
            template: '<div>' +
            '<p>Смотреть трейлер</p>' +
             '<div id="video"><iframe data-ng-src="{{trailerSource}}"></div>' +
            '</div>',
            scope: true,
            link: function(scope, elem, attrs) {
                elem.on('click', function(e) {
                    e.preventDefault();
                    var div = document.createElement('div');
                    getData.wrapperAPI('movies', 'getTrailers', {id: scope.film.id}, function(result) {
                        if(result && result.youtube.length) {
                            scope.$apply(function() {
                                scope.trailerSource = 'http://www.youtube.com/watch?v=' + result.youtube[0].source;
                                console.log(scope.trailerSource);
                            });
                        } else {
                            console.log('err get source youtube video');
                            return false;
                        }
                    });
                });
            }
        };
    }]);
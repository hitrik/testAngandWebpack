var db = require('../vendor/moviedb');

module.exports = angular.module('Directives', [])
.directive("searchWidget", [function() {
        return {
            restrict: "E",
            replace: true,
            templateUrl: './js/templates/search.tpl.html',
            controller: 'searchController',
            link: function(scope, elem) {
                var btn = elem.find('button'),
                    input = elem.find('input');
                btn.on('click', function(e) {
                    e.preventDefault();
                    var query = input.val();
                    if(query.trim()) {
                        scope.showOnSearch(query);
                        console.log(query);
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
    }]);
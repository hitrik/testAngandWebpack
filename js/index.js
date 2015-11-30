var angular = require('angular');
var ngRoute = require('angular-route');
var controllers = require('./controllers/main.ctrl');
var services = require('./services/getdata');
var directives = require('./directives/directive');
var app = angular.module('App', [controllers.name, services.name, directives.name, ngRoute]);

app.config(function($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider
    .when('/', {
        templateUrl: './js/templates/main_page.tpl.html'
    })
    .when('/search/:query?', {
        templateUrl: './js/templates/search_page.tpl.html',
        controller: 'searchController'
    })
    .when('/nowmovie', {
        templateUrl: './js/templates/nowmoview_page.tpl.html'
    })
    .when('/soon', {
        templateUrl: './js/templates/soon_moview_page.tpl.html'
    })
    .when('/film/:id', {
        templateUrl: './js/templates/item_film.tpl.html'
    })
    .otherwise({
            redirectTo: '/'
    });
});
angular.element(document).ready(function() {
    angular.bootstrap(document, [app.name]);
});
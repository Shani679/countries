const app=angular.module("app", ['ngRoute']);
app.config(function($routeProvider) {
    $routeProvider
    .when("/charts", {
        templateUrl : "charts.html"
    })
    .when("/map", {
        templateUrl : "map.html"
    })
});
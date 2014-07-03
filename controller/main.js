VERSION = '0.0-Alpha'

var mun = angular.module('mun',['ngRoute','ngSanitize']);
// Config the Route
mun.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider) {
	// Open the html5 Mode to remove the hashbang.
	// $locationProvider.html5Mode(true);
	$routeProvider.when('/',{
		templateUrl:'general.html'

	}).when('/about',{
		templateUrl:"about.html",
		controller:'About'
	})
}])

mun.controller('About', ['$scope', function($scope){
	$scope.ver = VERSION
}])
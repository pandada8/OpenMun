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
		controller:'AboutController'
	}).when('/motion/new',{
		templateUrl:"motion_new.html",
		controller:'MotionNew'
	})
}])

mun.controller("MenuCon",["$scope",'$location',function($scope,$location){
	$scope.menu = {
		1:['点名','/rollcall'],
		2:['主发言名单','/speaklist'],
		3:['动议','/motion'],
		4:['投票','/vote'],
		5:['统计','/statistic'],
		6:['设置','/setting'],
		7:['关于','/about'],
	}
	$scope.click = function(num){
		$scope.active = num
		$location.path($scope.menu[num][1])
	}

}])

mun.controller('AboutController', ['$scope', function($scope){
	$scope.ver = VERSION
}])

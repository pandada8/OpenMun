VERSION = '0.0-Alpha'

var mun = angular.module('mun',['ngRoute','ngSanitize','ui.bootstrap']);
// Config the Route
mun.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider) {
	$routeProvider.when('/',{
		templateUrl:'about.html'
	}).when('/about',{
		templateUrl:"about.html",
		controller:'AboutController'
	}).when('/motion/new',{
		templateUrl:"motion_new.html",
		controller:'MotionNew'
	}).when("/rollcall",{
		templateUrl:'rollcall.html',
		controller:'RollCall'
	}).when("/rollcall/new",{
		templateUrl:'rollcall_new.html',
		controller:'RollCallNew'
	}).when("/test",{
		templateUrl:'test.html',
		controller:'test'
	})
}])
mun.controller("menucon",["$scope","$location",function($scope,$location){
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

mun.controller('test',['$scope',function($scope){
	console.log('')
}])

mun.controller('AboutController', ['$scope', function($scope){
	$scope.ver = VERSION
}])


// // 下面是要用到的一些数据类

// function Country(id,engName,fullName,picUrl){
// 	this.engName = engName;
// 	this.fullName = fullName;
// 	this.picUrl = picUrl;
// 	this.id = id
// }
// function Motion(type){
// 	this.Type = type
// 	this.time_all = 0;
// 	this.time_each = 1;
// 	this.topic = "";
// }
// function Rollcall(present_countries,absent_countries){
// 	this.time = time.time();
// }

// // 全局数据存储

// var Data = {}
// Data.motions = {}
// Data.motions.data = []
// Data.motions.add = function(motion_){
// 	// 注意到这里使用的push，最新的在最后面
// 	Data.motions.data.push(motion_)
// }
// Data.rollcall = {}
// Data.rollcall.data = []
// Data.rollcall.new = function()


function RollCall(presents,all,time){
	a = {}
	if (!arguments[2]){
		var d = new Date()
		var time = d.getTime()
	}
	a.presents = presents
	a.present = presents.length
	a.all = all
	a.time = time
	a.onefifth = Math.ceil(a.present * 0.2 )
	a.simple = Math.floor(a.present * 0.5 + 1)
	a.major = Math.ceil(a.present * 2 / 3)
	a.time_human = d.toLocaleString()
	return a
}
function Country(chi,eng,flag,short){
	ret = {}
	ret.chi_name = chi
	ret.eng_name = eng
	ret.flag_url = flag
	ret.present = false
	ret.short = short
	return ret
}
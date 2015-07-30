VERSION = '1.0-Alpha'

var mun = angular.module('mun',['ngRoute','ui.bootstrap','ui.utils']);
// Config the Route
mun.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider) {
	$routeProvider.when('/',{
		templateUrl:'about.html',
		controller:'AboutController'
	}).when('/about',{
		templateUrl:"about.html",
		controller:'AboutController'
	}).when("/motion",{
		templateUrl:"motion.html",
		controller:"MotionCon"
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
	}).when("/speaklist",{
		templateUrl:'speaklist.html',
		controller:'SpeakList'
	}).when("/statistic",{
		templateUrl:'lazy.html'
	}).when("/vote",{
		templateUrl:'vote.html',
		controller:"VoteCon"
	}).when("/vote/new",{
		templateUrl:'vote_new.html',
		controller:'VoteNewCon'
	}).when("/setting",{
		templateUrl:'setting.html',
		controller:'SettingCon'
	}).when("/motion/1",{
		templateUrl:"motion_1.html",
		controller:'Motion1'
	}).when("/motion/2",{
		templateUrl:"motion_2.html",
		controller:"Motion2"
	})
}])
mun.controller("menucon",["$scope","$location","$rootScope",'$http',function($scope,$location,$rootScope,$http){
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
	// 对全局数据进行初始化
	// 鉴于导航栏全局存在于页面中，将逻辑写在这
	$rootScope.Data = {}
	// globalData = $rootScope.Data  // DELETEME 调试用
	// 初始化全部国家名单
	// 鉴于目前只有这一处需要用到网络，暂时使用 `http`
	// 懒得写错误处理了
	$http.get('/data.json').success(function(data,status,headers,config){
		data = data.map(function(x){
			x.flag_url = "i/"+ x.short + '.png';
			return x
		})
		$rootScope.Data.all_country = data
		$rootScope.Data.alive_country = []
		if ($rootScope.Data.current_rc){
			for (var i in $rootScope.Data.current_rc.presents){
				var c = $rootScope.Data.current_rc.presents[i]
				$rootScope.Data.alive_country.push($rootScope.Data.findCountryByShort(c))
			}
		}

		console.log('国家初始化成功，载入'+data.length+'个国家')
	})
	// 从localStorage载入历史数据
	$rootScope.Data.vote = {};


	$rootScope.Data.findCountryByShort = function(short){
		for (var i in $rootScope.Data.all_country){
			if ($rootScope.Data.all_country[i]['short'] == short){
				return $rootScope.Data.all_country[i];
			}
		}
		return undefined;
	};
	$rootScope.Data.put = function(key,content){
		if (content){
			localStorage.setItem(key,JSON.stringify(content))
		}
	}
	$rootScope.Data.fetch = function(key){
		var temp = localStorage.getItem(key);
		return temp ? JSON.parse(temp) : undefined;
	};
	$rootScope.Data.fetch_default = function(key,default_){
		var temp = $rootScope.Data.fetch(key);
		return temp ? temp : default_;
	}
	$rootScope.Data.update = function(key,content){
		var temp = $rootScope.Data.fetch_default(key,[])
		temp.push(content)
		$rootScope.Data.put(key,temp)
	};
	//  从本地缓存中获取数据
	$rootScope.Data.wait_list = $rootScope.Data.fetch_default('wait_list',[])
	$rootScope.Data.current_rc = $rootScope.Data.fetch('current_rc')
	$rootScope.Data.setting = $rootScope.Data.fetch_default('setting',{
		speaklist_time:120 // 默认120 秒
	})
	// 每隔一段时间存储实时数据
	setInterval(function(){
		$rootScope.Data.put('wait_list',$rootScope.Data.wait_list);
		$rootScope.Data.put('current_rc',$rootScope.Data.current_rc)
		$rootScope.Data.put('setting',$rootScope.Data.setting)
	},5 * 1000)


}])

mun.controller('test',['$scope','$rootScope',function($scope,$rootScope){
	$scope.all_country = $rootScope.Data.all_country
}])

mun.controller('AboutController', ['$scope', function($scope){
	$scope.ver = VERSION
}])




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

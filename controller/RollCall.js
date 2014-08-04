var mun = angular.module('mun')
mun.controller('RollCall',['$scope','$rootScope',function($scope,$rootScope){
	$scope.current = $rootScope.Data.current_rc
	$scope.history = $rootScope.Data.fetch_default('rollcall',[]).reverse()
}])
mun.controller("RollCallNew",["$scope",'$rootScope','$location',function($scope,$rootScope,$location){
	$scope.all_country = $rootScope.Data.all_country
	$scope.alives = {}
	for (var i in $scope.all_country){
		$scope.alives[$scope.all_country[i]['short']] = false
	}
	$scope.rc = function(){
		ret = {}
		var t = new Date()
		ret.time = t.toLocaleString()
		ret.timestamp = t.getTime()
		ret.presents = []
		for (var i in $scope.alives){
			if ($scope.alives[i]){
				ret.presents.push(i)
			}
		}
		ret.present = ret.presents.length
		ret.onefifth = Math.ceil(ret.present * 0.2 )
		ret.major = Math.ceil(ret.present * 2 / 3)
		ret.simple = Math.floor(ret.present * 0.5 + 1)
		ret.all = $scope.all_country.length
		return ret;
	}
	$scope.alive = function(){
		var alive = 0;
		for (var i in $scope.alives){
			if ($scope.alives[i]){
				alive ++;
			}
		}
		$scope.onefifth = Math.ceil(alive * 0.2 )
		$scope.major = Math.ceil(alive * 2 / 3)
		$scope.simple = Math.floor(alive * 0.5 + 1)
		return alive;
	}
	$scope.submit = function(){
		var alives = []
		for (var i in $scope.alives) {
			if ($scope.alives[i]){
				alives.push($rootScope.Data.findCountryByShort(i))
			}
		};
		// 更新全局数据
		$rootScope.Data.alive_country = alives
		$rootScope.Data.current_rc = $scope.rc()
		$rootScope.Data.update('rollcall',$rootScope.Data.current_rc)
		$rootScope.Data.put('current_rc',$rootScope.Data.current_rc)
		$location.path("/rollcall")
	}
	
}])

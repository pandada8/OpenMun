var mun = angular.module('mun')
mun.controller('RollCall',['$scope',function($scope){
	// Filled with Fake Test date
	// FIXME Use global data storage
	$scope.current = RollCall(['JPN','CHN','USA','AFG','BEL','BRA','CAN','CHL','CHN'],50)
	$scope.history = []
	$scope.history.push(RollCall(['JPN','CHN','USA','AFG','BEL','BRA','CAN','CHL','CHN'],50))
	$scope.history.push(RollCall(['JPN','CHN','USA','AFG','BEL','BRA','CAN','CHL','CHN'],50))
	$scope.history.push(RollCall(['JPN','CHN','USA','AFG','BEL','BRA','CAN','CHL','CHN'],50))
	$scope.history.push(RollCall(['JPN','CHN','USA','AFG','BEL','BRA','CAN','CHL','CHN'],50))
	$scope.history.push(RollCall(['JPN','CHN','USA','AFG','BEL','BRA','CAN','CHL','CHN'],50))
	$scope.history.push(RollCall(['JPN','CHN','USA','AFG','BEL','BRA','CAN','CHL','CHN'],50))
	$scope.history.push(RollCall(['JPN','CHN','USA','AFG','BEL','BRA','CAN','CHL','CHN'],50))
	$scope.history.push(RollCall(['JPN','CHN','USA','AFG','BEL','BRA','CAN','CHL','CHN'],50))
	$scope.history.push(RollCall(['JPN','CHN','USA','AFG','BEL','BRA','CAN','CHL','CHN'],50))
	$scope.history.push(RollCall(['JPN','CHN','USA','AFG','BEL','BRA','CAN','CHL','CHN'],50))
	$scope.history.push(RollCall(['JPN','CHN','USA','AFG','BEL','BRA','CAN','CHL','CHN'],50))
	$scope.history.push(RollCall(['JPN','CHN','USA','AFG','BEL','BRA','CAN','CHL','CHN'],50))
	$scope.history.push(RollCall(['JPN','CHN','USA','AFG','BEL','BRA','CAN','CHL','CHN'],50))
	$scope.history.push(RollCall(['JPN','CHN','USA','AFG','BEL','BRA','CAN','CHL','CHN'],50))
	console.log('Enter controller')

}])
mun.controller("RollCallNew",["$scope",'$location',function($scope,$location){
	$scope.all_country = []
	// FIXME load date from cache 
	$scope.all_country.push(Country("中国",'China','i/CHN.png','CHN'))
	$scope.all_country.push(Country("中国",'China','i/CHN.png','CHN'))
	$scope.all_country.push(Country("中国",'China','i/CHN.png','CHN'))
	$scope.all_country.push(Country("中国",'China','i/CHN.png','CHN'))
	$scope.all_country.push(Country("中国",'China','i/CHN.png','CHN'))
	$scope.all_country.push(Country("中国",'China','i/CHN.png','CHN'))
	$scope.alive = function(){
		var alive = 0;
		var all = $scope.all_country.length
		for (var i = all - 1;i >= 0;i--){
			if ($scope.all_country[i]['present']){
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
		for (var i = $scope.all_country.length - 1; i >= 0; i--) {
			if ($scope.all_country[i]['present']){
				alives.push($scope.all_country[i]['short'])
			}
		};
		r = RollCall(alives,$scope.all_country.length)
		console.log(r)
		// FIXME 纳入全局数据
		$location.path("/rollcall")
	}
	
}])

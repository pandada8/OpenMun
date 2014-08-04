angular.module('mun').controller('SpeakList', ['$scope','$rootScope', function($scope,$rootScope){
	$scope.wait_list = $rootScope.Data.wait_list
	$scope.maxNumber = $rootScope.Data.setting.speaklist_time
	$scope._size = 225
	$scope.next = function(){
		if($scope.wait_list.length > 0){
			$scope.current = $scope.wait_list.shift()
			$scope.$$childHead.reset()
		}
	}

	$scope.add = function(){
		if (typeof($scope.selectCountry) != 'string'){
			$scope.wait_list.push($scope.selectCountry)
		}
	}
	$scope.del = function(num){
		console.log(num)
		$scope.wait_list.splice(num,1)
	}
	$scope.all_country = $rootScope.Data.alive_country

}])
angular.module('mun').controller('SettingCon', ['$scope', function($scope){
	$scope.clear = function(){
		if (confirm('本操作无法撤回，确认要清除历史数据么？')){
			localStorage.clear()
		}
	}
}])
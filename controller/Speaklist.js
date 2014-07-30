angular.module('mun').controller('SpeakList', ['$scope', function($scope){
	// FIXME 使用全局数据
	$scope.wait_list
	
	$scope.wait_list = []
	// FIXME 在载入页面时从localStorage导入
	

	$scope.reset = function(){
		$scope.$$childHead.reset()
	}
	$scope.next = function(){
		if($scope.wait_list.length > 0){
			$scope.current = $scope.wait_list.shift()
		}
	}

	$scope.add = function(){
		$scope.wait_list.push(($scope.selectCountry))
	}
	$scope.del = function(num){
		console.log(num)
		$scope.wait_list.splice(num,1)
	}


	// FIXME 使用全局的数据来源
	$scope.all_countries = []
	
	$scope.all_countries.push(Country("中国",'China','i/CHN.png','CHN'))
	$scope.all_countries.push(Country("美国",'United States','i/USA.png','USA'))
	$scope.all_countries.push(Country("巴西",'Brazil','i/BRA.png','BRA'))
	$scope.all_countries.push(Country("韩国",'Korea','i/KOR.png','KOR'))
	$scope.all_countries.push(Country("日本",'Japan','i/JAP.png','JAP'))
	

	// 初始化typeahead
	$scope.selectCountry = null;

	$scope.exampleOptions = {
		highlight: true,
		editable:false
	};

	var country = new Bloodhound({
		datumTokenizer:function (d){return Bloodhound.tokenizers.whitespace(d.eng_name)},
		queryTokenizer: Bloodhound.tokenizers.whitespace,
		local: $scope.all_countries
	})

	country.initialize();
	$scope.numbersDataset = {
    	displayKey: 'eng_name',
    	source: country.ttAdapter()
	};
	
}])
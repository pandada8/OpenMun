angular.module("mun").controller('VoteCon', ['$scope','$rootScope','$location', function($scope,$rootScope,$location){
	$scope.result = function(vote){
		if (vote.pass){
			return "<span class='pass'>通过</span>";
		}else{
			return "<span class='fail'>失败</span>";
		}
	}
	$scope.new = function(){
		$rootScope.Data.vote_new_topic = $scope.new_topic;
		$location.path('/vote/new');
	}
	
	$scope.history_votes = $rootScope.Data.fetch_default('vote',[]).reverse()  // 翻转方便查看
}]).controller('VoteNewCon', ['$scope','$rootScope','$location','$modal', function($scope,$rootScope,$location,$modal){
	$scope.topic = $rootScope.Data.vote_new_topic ? $rootScope.Data.vote_new_topic : '测试';
	$scope.final_result = '等待投票完成'
	$scope.all_country = $rootScope.Data.all_country;
	$scope.abstain = []
	$scope.result = {}
	$scope.round = '第一轮';
	$scope.yes = []
	$scope.no = []
	// 初始化默认投票结果
	for (var i in $scope.all_country){
		$scope.result[$scope.all_country[i]['short']] = 'no'
	}
	$scope.checkPermentMember = function(yes,no){
		// 只要以下国家投了反对票就Out
		country = ['CHN','ROC','FRA','USA','RUS','GBR'];
		// 注意到中国可能的简称有中华人民共和国 CHN 和中华民国 ROC
		result = true;
		for (var c in country){
			for (var i in no){
				if (country[c] == no[i]){
					result = false;
				}
			}
		}
		return result;
	}
	$scope.calc = function(){
		var t = new Date();

		var ret = {};
		ret.time = t.toLocaleString();
		ret.timestamp = t.getTime();
		ret.topic = $scope.topic;
		ret.yes = $scope.yes;
		ret.abstain = $scope.abstain;
		ret.no = $scope.no;
		ret.pass = false;

		if ($scope.checkPermentMember($scope.yes,$scope.no)){
			// 五常都赞成
			if ($scope.yes.length >= $rootScope.Data.rollcall.major){
				// 满足人数
				ret.pass = true
				ret.detail = '通过'
			}else{
				ret.detail = '人数未达 2/3 多数'
			}
		}else{
			ret.detail = "常任理事国不赞成"
		}
		return ret;
	}
	$scope.submit = function(){
		if ($scope.round == '第一轮'){
			// 清理列表
			var pass = []
			for(var i in $scope.result){
				switch($scope.result[i]){
					case 'yes':
						$scope.yes.push(i);
						break;
					case 'no':
						$scope.no.push(i);
						break;
					case 'pass':
						pass.push($rootScope.Data.findCountryByShort(i))
						break;
					case 'abstain':
						$scope.abstain.push(i);
						break;
				}
			}
			// 更新视图
			$scope.all_country = pass;
			$scope.round = "第二轮"
		}else if ($scope.round == '第二轮'){
			// 清理数据
			for(var i in $scope.result){
				switch($scope.result[i]){
					case "yes":
						$scope.yes.push(i);
						break;
					case "no":
						$scope.no.push(i);
						break;
				}
			}
			// 生成结果
			var result = $scope.calc();
			// 添加结果进入历史
			// 显示对话框
			$scope.result = result
			$scope.dialog()

		}
	}
	$scope.dialog= function(){
		var modalInstance = $modal.open({
			templateUrl:'modaltpl.html',
			resolve:{
				voteresult:function(){
					return $scope.result
				}
			},
			controller:['$scope','$modalInstance','$rootScope','voteresult', function($scope,$modalInstance,$rootScope,voteresult){
				$scope.yes = []
				$scope.no = []
				$scope.abstain = []
				$scope.detail = voteresult.detail

				for(var i in voteresult.yes){
					$scope.yes.push($rootScope.Data.findCountryByShort(voteresult.yes[i]))
				}
				for(var i in voteresult.no){
					$scope.no.push($rootScope.Data.findCountryByShort(voteresult.no[i]))
				}
				for(var i in voteresult.abstain){
					$scope.abstain.push($rootScope.Data.findCountryByShort(voteresult.abstain[i]))
				}

				if (voteresult.pass){
					$scope.style = {'color':'green','text-align':"center"}
				}else{
					$scope.style = {'color':'red',"text-align":"center"}
				}
				$scope.close = function(){
					$modalInstance.close()
				}
			}]
		})
		modalInstance.result.then(function(){
			$rootScope.Data.update('vote',$scope.result);
			// 输出调试信息
			console.log('新建投票')
			console.log($scope.result)
			$location.path('/vote')
		})
	}
}])
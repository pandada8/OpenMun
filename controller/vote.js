angular.module("mun").controller('VoteCon', ['$scope', function($scope){
	$scope.time = function(vote){
		var temp = new Date()
		temp.setTime(vote.time)
		return temp.toLocaleString()
	}
	$scope.content = function(vote){
		return vote.topic
	}
	$scope.result = function(vote){
		if (vote.pass){
			return "<span class='pass'>Pass</span>";
		}else{
			return "<span class='fail'>Fail</span>";
		}
	}
	$scope.history_votes = []
	// FIXME 与全局数据关联
	$scope.history_votes.push(Vote([],[],[],'指令草案1.1',true))
	$scope.history_votes.push(Vote([],[],[],'指令草案1.1',false))
	$scope.history_votes.push(Vote([],[],[],'指令草案1.1',true))
	$scope.history_votes.push(Vote([],[],[],'指令草案1.1',false))
	$scope.history_votes.push(Vote([],[],[],'指令草案1.1',true))
	$scope.history_votes.push(Vote([],[],[],'指令草案1.1',false))
	$scope.history_votes.push(Vote([],[],[],'指令草案1.1',true))
	$scope.history_votes.push(Vote([],[],[],'指令草案1.1',false))
}])
angular.module('mun').controller('VoteNewCon', ['$scope', function($scope){
	
}])
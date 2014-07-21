// TODO 使用统一的Motion结构体

var mun = angular.module('mun')
mun.controller('MotionNew',["$scope",'$location',function($scope,$location){
  $scope.motion_type = {
    1:'自由磋商',
    2:'有主持核心磋商',
    3:'更改投票顺序',
    4:'取消延置决议草案',
    5:'修改正式辩论发言时间',
    6:'暂时休会',
    7:'延置决议草案',
    8:'结束正式辩论'
  }


  $scope.suc = true;
  $scope.click = function(num){

    $scope.now = num
    $scope._type = $scope.motion_type[num]
    if (num >= 7 ){
      $scope.people_require = "三分之二多数"
      // FIXME : 与Rollcall 结合实时显示需要人数
    }else{
      $scope.people_require = "简单多数"
    }
    // FIXME 剩下的逻辑
  }
  // $scope.$watch()
  $scope.back = function(){
    // TODO 抓取数据并存储
    d = {}

    // 返回 /motion 页
    $location.path('/motion')
  }

  // 进行初始化
  $scope.click(1)

}])

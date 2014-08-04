

angular.module('mun').controller('MotionNew', ["$scope", '$rootScope', '$location', function ($scope, $rootScope, $location) {
  $scope.motion_type = {
    1: '自由磋商',
    2: '有主持核心磋商',
    3: '更改投票顺序',
    4: '取消延置决议草案',
    5: '修改正式辩论发言时间',
    6: '暂时休会',
    7: '延置决议草案',
    8: '结束正式辩论'
  };

  $scope.click = function (num) {

    $scope.now = num;
    $scope._type = $scope.motion_type[num];
    if (num >= 7) {
      $scope.people_require = $rootScope.Data.current_rc.major;
    } else {
      $scope.people_require = $rootScope.Data.current_rc.simple;
    }
    // FIXME 剩下的逻辑
  };
  $scope.all_country = $rootScope.Data.alive_country;
  $scope.maxNumber = 90;
  $scope._size = 225;
  // 进行初始化
  $scope.click(1);
  $scope.submit = function () {
    if ($scope.agree >= $scope.people_require && $scope.now < 3) {
      switch ($scope.now) {
      case 1:
        // 自由磋商
        $rootScope.temp_data = {'time': $scope.time1, 'agree': $scope.agree, "sponsor": $scope.sponsor};
        $location.path('/motion/1');
        break;
      case 2:
        // 有组织核心磋商 
        $rootScope.temp_data = {'topic': $scope.topic2, 'all': $scope.all_time2, "each": $scope.each_time2, 'agree': $scope.agree, "sponsor": $scope.sponsor};
        $location.path('/motion/2');
        break;  
      // 剩下的不需要新开页面
      }
    } else {
      var data = {};
      data.type = $scope.motion_type[$scope.now]
      switch ($scope.now) {
      case 1:
        data.info = "自由磋商" + $scope.time1 + '秒';
        data.info_time = $scope.time;
        break;
      case 2:
        data.info = "有组织核心磋商：" + $scope.topic2 + ",总时长" + $scope.all_time2 + ',单次' + $scope.each_time2;
        data.topic = $scope.topic;
        data.info_time = $scope.all_time2;
        data.time_each = $scope.each_time2;
        break;
      case 3:
        data.info = '修改决议草案' + $scope.dp3 + '的投票顺序';
        data.dp = $scope.dp3;
        break;
      case 4:
        data.info = '取消延置决议草案' + $scope.dp4;
        data.dp = $scope.dp4;
        break;
      case 5:
        data.info = '修改正式辩论发言时间为' + $scope.time5;
        data.info_time = Number($scope.time5);
        $rootScope.Data.setting.speaklist_time = data.info_time;
        break;
      case 6:
        break;
      case 7:
        data.info = "取消延置决议草案" + $scope.dp7;
        data.dp = $scope.dp7;
        break;
      case 8:
        data.info = "结束正式辩论";
        break;
      }
      var t = new Date();
      data.sponsor = $scope.sponsor
      data.time = t.toLocaleString();
      data.timestamp = t.getTime();
      data.agree = $scope.agree;
      if ($scope.agree >= $scope.people_require) {
        data.pass = true;
        data.result = '通过';
      } else {
        data.pass = false;
        data.result = '未通过';
      }
      $rootScope.Data.update('motion', data);
      $location.path('/motion')
    }
  };
}]).controller('MotionCon', ['$scope', "$rootScope", function ($scope, $rootScope) {
  $scope.motion_his = $rootScope.Data.fetch_default('motion',[]).reverse();
}]).controller('Motion1', ['$scope', '$rootScope', '$location', function ($scope, $rootScope, $location) {
  $scope._size = 600;
  $scope.maxNumber = Number($rootScope.temp_data.time);
  $scope.submit = function () {
    var data = {};
    data.info = "自由磋商" + $scope.maxNumber + '秒';
    data.info_time = $scope.maxNumber;
    var t = new Date();
    data.type = '自由磋商'
    data.time = t.toLocaleString();
    data.timestamp = t.getTime();
    data.agree = $rootScope.temp_data.agree;
    data.sponsor = $rootScope.temp_data.sponsor;
    data.result = '通过'
    data.pass = true
    $rootScope.Data.update('motion', data);
    $location.path('/motion');
  };
}]).controller('Motion2', ['$scope', '$rootScope', '$location', function ($scope, $rootScope, $location) {
  $scope._size = 225;
  $scope.maxNumber = $rootScope.temp_data.each;
  $scope.all = $rootScope.temp_data.all
  $scope.topic = $rootScope.temp_data.topic
  // $scope.maxNumber = 10;
  // $scope.all = 300
  // $scope.topic = '测试'
  $scope.history = []
  $scope.wait_list = []
  $scope.wait_list.push($rootScope.temp_data.sponsor)
  $scope.history.push($rootScope.temp_data.sponsor.short)
  $scope.next = function(){
    if($scope.wait_list.length > 0){
      $scope.current = $scope.wait_list.shift()
      $scope.$$childHead.reset()
      $scope.$$childHead.$$nextSibling.pause()
    }
  }

  $scope.add = function(){
    if (typeof($scope.selectCountry) != 'string'){
      $scope.wait_list.push($scope.selectCountry)
      $scope.history.push($scope.selectCountry.short)
    }
  }
  $scope.del = function(num){
    console.log(num)
    $scope.wait_list.splice(num,1)
  }
  $scope.all_country = $rootScope.Data.alive_country
  $scope.submit = function(){
    var t = new Date()
    data = {
      'topic':$scope.topic,
      'time':t.toLocaleString(),
      'timestamp':t.getTime(),
      'agree':$rootScope.temp_data.agree,
      'sponsor':$rootScope.temp_data.sponsor,
      'attend':$scope.history,
      'result':'通过',
      'pass':true,
      'info':'关于' + $scope.topic + '主磋',
      'type':'有组织核心磋商'
    }
    $rootScope.Data.update('motion',data)
    $location.path('/motion')
  }


  setTimeout(function(){
    $scope.$$childHead.callback = function(){
        $scope.$$childHead.$$nextSibling.click(true)
    }
    $scope.$$childHead.$$nextSibling.callback = function(){
        $scope.$$childHead.click(true)
    }
    $scope.$$childHead.$$nextSibling.maxNumber = $scope.all
    $scope.$$childHead.$$nextSibling.reset()
   },20)
  s = $scope
}]);

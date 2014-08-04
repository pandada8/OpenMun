TICK = 30
var myModule = angular.module('mun')
/*
* take from the jQuery.easing.js
* http://gsgd.co.uk/sandbox/jquery/easing/jquery.easing.1.3.js
* with a little change
*/ 

myModule.directive('muTimer', ['$interval','$rootScope',function($interval,$rootScope){
	return {
		scope:true,
		controller: function($scope, $element, $attrs, $transclude) {
			
			$scope._font_size = 40
			$scope._color = "#3498db" // Color of the Circle
			$scope._bgcolor = "#7f8c8d" // Background
			$scope._iacolor = "#bdc3c7" // Inactive
			$scope._acolor = "#ff0000"
			 // the height & width are same
			
			// $scope.maxNumber = $rootScope.Data.setting.speaklist_time //  ATTENTION Change eachtime here
			$scope.currentValue = $scope.maxNumber; 
			$scope.style = 'smooth'
			$scope.running = false
			$scope.tick = 0
			$scope.initfc = function(){
				var d = angular.element($element[0])
				d.css('height',$scope._size)
				d.css('width',$scope._size)
				$element[0].children[0].height = $scope._size
				$element[0].children[0].width = $scope._size
				var s = angular.element($element[0].children[1])

				s.css('line-height',$scope._size+'px')
				s.css('font-size',$scope._font_size+'px')
				s.css('height',$scope._size)
				s.css('width',$scope._size)
				s.css('position','relative')
				s.css('top','-' + ($scope._size + 9) + 'px' )
				s.css('color','grey')
				s.css('text-align','center')
				s.css('text-shadow','0 0 8px #FFF')
				var b = angular.element($element[0].children[2])
				b.css('position','relative');
				b.css('top','-133%');
				b.css('margin','auto');
				b.css('display',"block")
			}
			
			$scope.updateUI = function(){
				
				var arc
				var h,w,m_h,m_w

				//check the R of the circle	
				h = $scope._c.height
				w = $scope._c.width
				cw = Math.floor(Math.min(h,w)/2 * 0.15)
				R = Math.floor(Math.min(h,w)/2) - cw
				m_h = Math.floor(h/2)
				m_w = Math.floor(w/2)
				arc = $scope.currentValue / $scope.maxNumber * 2 * Math.PI
				
				$scope._cc.clearRect(0,0,w,h)
				$scope._cc.lineWidth = cw*0.3
				//draw background
				$scope._cc.strokeStyle = $scope._bgcolor
				$scope._cc.beginPath()
					$scope._cc.arc(m_w,m_h,R,0,Math.PI*2)
				$scope._cc.stroke()
				$scope._cc.closePath()
				$scope._cc.lineWidth = cw
				if ($scope.running){
					if ($scope.tick*TICK >= $scope.maxNumber*750){
						$scope._cc.strokeStyle = $scope._acolor
					}else{
						$scope._cc.strokeStyle = $scope._color
					}
				}else{
					$scope._cc.strokeStyle = $scope._iacolor
				}
				
				$scope._cc.beginPath()
					$scope._cc.arc(m_w,m_h,R,-Math.PI/2,arc - Math.PI/2)
				$scope._cc.stroke()
				$scope._c2.innerHTML = Math.floor($scope.maxNumber - $scope.tick * TICK / 1000) + " sec"
				

			}

			$scope.countdown = function(){
				if ($scope.running ){
					if ( ($scope.tick+1) * TICK <= $scope.maxNumber * 1000 ){
						$scope.tick += 1
						$scope.currentValue-=TICK / 1000;
					}
				}else{
					$interval.cancel($scope.promise)
					$scope.running = false
					angular.element($element[0].children[1]).css('color','grey')
					$scope.tick = Math.floor($scope.maxNumber*1000/TICK)
					$scope.currentValue = 0
				}
				$scope.updateUI()
			}
			$scope.click = function(f){
				if ($scope.running){
					$interval.cancel($scope.promise)
					$scope.running = false
					angular.element($element[0].children[1]).css('color','grey')
					$scope.updateUI()
				}else{
					if ($scope.tick * TICK < $scope.maxNumber * 1000){
						$scope.running = true
						angular.element($element[0].children[1]).css('color','black')
						$scope.promise = $interval($scope.countdown,TICK)
					}
				}
				if ($scope.callback && !f){
					$scope.callback()
				}
			}
			$scope.reset = function(max,current){
				if ($scope.running){
					$interval.cancel($scope.promise);
					$scope.running = false;
				}
				$scope.tick = 0
				$scope.currentValue = $scope.maxNumber
				$scope.updateUI()
			}
			$scope.pause = function(){
				if ($scope.running){
					$interval.cancel($scope.promise)
					$scope.running = false
					angular.element($element[0].children[1]).css('color','grey')
					$scope.updateUI()
				}
			}
			
		},
		replace:true,
		restrict: 'AE', // E = Element, A = Attribute, C = Class, M = Comment
		template:'<div><canvas class="time-canvas"></canvas><div ng-click="click()" ></div><button class="btn btn-danger" ng-click="reset()">重置</button></div>',
		link: function($scope, iElm, iAttrs, controller) {
			$scope._c = iElm[0].children[0]
			$scope._c2 = iElm[0].children[1]
			$scope._cc = $scope._c.getContext('2d')
			$scope.initfc()
			$scope.updateUI()
			$scope._c2.innerHTML = Math.floor($scope.maxNumber - $scope.tick * TICK / 1000)+ " sec"
		},

	};
}]);
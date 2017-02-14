(function (angular) {
	'use strict';

	var myApp = angular.module('MyTodoMvc',[function(){}]);
	myApp.controller('MainController',['$scope','$location',function($scope,$location){

		function getid(){
			var id = Math.random();
			for(var i = 0;i < $scope.todos.length;i++){
				if($scope.todos[i].id == id){
					id = getid();
					break;
				}
			}
			return id;
		}
		$scope.text = '';
		$scope.todos = [
			{
				id : Math.random(),
				text:'xuexi',
				completed:false
			},
			{
				id : Math.random(),
				text: '睡觉',
				completed:false
			},
			{
				id : Math.random(),
				text: '打豆豆',
				completed:true
			}
		];
		$scope.add = function(){
			if(!$scope.text){
				return;
			}
			$scope.todos.push({
				id : getid(),
				text:$scope.text,
				completed:false
		});
		$scope.text = '';
		}

		//删除一项
		$scope.remove = function(id){
			for(var i = 0;i < $scope.todos.length;i++){
				if($scope.todos[i].id == id){
					$scope.todos.splice(i,1);
					break;
				}
			}
		}

		//完成清空
		$scope.clear = function(){
			var result = [];
			for(var i = 0;i < $scope.todos.length;i++){
				if(!$scope.todos[i].completed){
					result.push($scope.todos[i]);
				}
			}
			$scope.todos = result;
		}

		//当有完成项时，显示clear completed
		$scope.showCompleted = function(){
			for(var i = 0;i < $scope.todos.length;i++){
				if($scope.todos[i].completed){
					return true;
				}
			}
			return false;
		}

		$scope.crruentEditingId = -1;
		$scope.editing = function(id){
			$scope.crruentEditingId = id;
		}

		$scope.save = function(){
			$scope.crruentEditingId = -1;
		}

		var now = true;
		$scope.toggle = function(){
			for(var i = 0;i < $scope.todos.length;i++){
				$scope.todos[i].completed = now
		}
			now = !now;
		}

		//筛选三种状态: {} {completed:true} {completed:false}
		$scope.selector = {};
        $scope.$location = $location;

        //用$watch()锚点的变化,$watch只能监视$scope的数据
        //取得页面的锚点：通过$location.path()取得锚点
        //console.log($scope.$location);
		$scope.$watch('$location.hash()', function(now, old) {
			console.log(now);
			switch (now) {
				case '/active':
					$scope.selector = {completed: false};
					break;
				case '/completed':
					$scope.selector = {completed: true};
					break;
				default:
					$scope.selector = {};
					break;
			}
		});




	}]);
})(angular);

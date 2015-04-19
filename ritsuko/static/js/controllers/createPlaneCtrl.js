angular.module('schedulerApp')
	   .controller('createPlaneCtrl',
	   			  ['$scope',
	   			   '$http',
	   			   '$location',
	   			   '$interval',
	   			   '$anchorScroll',
	   			   'notificationService',

function($scope, $http, $location, $interval, $anchorScroll, notificationService) {

	$scope.addPlaneSubmit = function() {

		$http.post('/planes', $scope.plane).
			success(function(data, status, headers, config) {
				$location.path('/timetable');
			}).
			error(function(data, status, headers, config) {
				console.log(status);
			});

	};



}]);
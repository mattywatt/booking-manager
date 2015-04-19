angular.module('schedulerApp')
	   .controller('loginCtrl',
	   			  ['$scope',
				   '$http',
				   '$location',
				   '$window',

function($scope, $http, $location, $window) {

	$scope.login = function() {

		$http.post('/login', $scope.user).
			// Same page loading animation
			success(function(data, status, headers, config) {
				$location.path('/timetable');
			}).
			error(function(data, status, headers, config) {

			});
	};

	$scope.toLogin = function() {
		$location.path('/login');
	};
	
}]);
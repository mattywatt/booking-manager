angular.module('schedulerApp')
	   .controller('registerCtrl',
	   			  ['$scope',
				   '$http',
				   '$location',
				   '$window',

function($scope, $http, $location, $window) {

	$scope.user = {};
	$scope.user.type = 'student';

	$scope.submit = function() {

		$http.post('/users', $scope.user).
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
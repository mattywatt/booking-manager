angular.module('schedulerApp')
	   .controller('notificationController',
	   			  ['$scope',
	   			   '$timeout',
	   			   'notificationService',

function($scope, $timeout, notificationService) {

	$scope.$on('actionPushed', function(event, action) {
		$timeout(function () {
			console.log('rep ctrl = ' + action);
		    $scope.reputationAction = action;
		}, 0);
    });

}]);
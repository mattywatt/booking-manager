angular.module('schedulerApp')
       .service('notificationService',

	function($rootScope) {
        this.pushAction = function(action) {
        	console.log('action pushed!');
        	$rootScope.$broadcast('actionPushed', action);
        };
	}
);
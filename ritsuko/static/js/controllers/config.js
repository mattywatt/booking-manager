angular.module('schedulerApp', ['ngRoute'])

.config(['$interpolateProvider',
		 '$routeProvider',
		 '$locationProvider',
		 '$httpProvider',

function($interpolateProvider, $routeProvider, $locationProvider, $httpProvider) {

	$interpolateProvider.startSymbol('<%').endSymbol('%>');
	
	$routeProvider
		.when('/', {
			controller: 'timetableCtrl',
			templateUrl: 'static/js/templates/timetable.html'
		})
		.when('/plane/new', {
			controller: 'createPlaneCtrl',
			templateUrl: 'static/js/templates/plane_create.html'
		})
		.when('/register', {
			controller: 'registerCtrl',
			templateUrl: 'static/js/templates/register.html'
		})
		.when('/login', {
			controller: 'loginCtrl',
			templateUrl: 'static/js/templates/login.html'
		});


}]);


angular.module('schedulerApp')
	   .controller('timetableCtrl',
	   			  ['$scope',
	   			   '$http',
	   			   '$location',
	   			   '$interval',
	   			   '$anchorScroll',
	   			   'notificationService',

function($scope, $http, $location, $interval, $anchorScroll, notificationService) {

	$scope.bookingModalVisible = false;
	$scope.timetableDate = new Date().toDateString();

	$scope.$watch('timetableDate', function(newDate, oldDate) {
		$http.get('/bookings/' + newDate).
			success(function(data, status, headers, config) {
				$scope.bookings = data;
			}).
			error(function(data, status, headers, config) {
				console.log(status);
			});
	});

	/*
	$http.get('/bookings').
		success(function(data, status, headers, config) {
			$scope.bookings = data;
		}).
		error(function(data, status, headers, config) {
			console.log(status);
		});
	*/
	
	$scope.showBookingModal = function() {
		$scope.bookingModalVisible = true;
		
		$http.get('/planes').
			success(function(data, status, headers, config) {
				$scope.planes = data;
			}).
			error(function(data, status, headers, config) {
				console.log(status);
			});

		$http.get('/instructors').
			success(function(data, status, headers, config) {
				$scope.instructors = data;
			}).
			error(function(data, status, headers, config) {
				console.log(status);
			});
	};

	$scope.refreshBookings = function() {
		$http.get('/bookings').
			success(function(data, status, headers, config) {
				$scope.bookings = data;
			}).
			error(function(data, status, headers, config) {
				console.log(status);
			});
	};

	$scope.addBookingSubmit = function() {

		$scope.booking.startDate = $scope.booking.startDate + 'T' + $scope.booking.startTime + ':00';
		$scope.booking.endDate = $scope.booking.endDate + 'T' + $scope.booking.endTime + ':00';

		$http.post('/bookings', $scope.booking).
			success(function(data, status, headers, config) {
				$scope.bookingModalVisible = false;
				$scope.refreshBookings();

				//$scope.booking.startDate = '';
				//$scope.booking.endDate = '';
			}).
			error(function(data, status, headers, config) {
				console.log(status);
			});
	};

	$scope.viewBooking = function(bookingId) {
		$location.path('/bookings/' + bookingId);
	};

}]);
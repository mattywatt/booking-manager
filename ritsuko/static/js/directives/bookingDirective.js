angular.module('schedulerApp')
       .directive('datepicker',

function() {
    return {
        restrict: "E",
        scope: {
            bookingId: '&bookingId' // one way bind
        },
        link: function (scope, elem, attrs) {
            console.log(scope.bookingId);
            scope.$location.path('/bookings/' + scope.bookingId);
        }
    };
});


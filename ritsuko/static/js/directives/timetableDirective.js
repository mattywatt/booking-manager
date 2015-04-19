angular.module('schedulerApp')
       .directive('timetable',

function() {
	return {
		restrict: 'E',
		scope: {
			bookings: '=',
			timetableDate: '='
		},
		link: function(scope, elem, attrs) {

				scope.$watch('bookings', function(updatedBookings, unupdatedBookings) {
					if (typeof updatedBookings !== 'undefined') {
						
						scope.renderTimetable(updatedBookings);
					}
				});

				// bookings

				scope.renderTimetable = function(planes) {

					console.log(planes);

					for (var i = 0; i < planes.length; i++) {
										
						var timetableWidth = 1000;
						var start = new Date(scope.timetableDate);
						var end = new Date(scope.timetableDate);
						start.setHours(0,0,0,0);
						end.setHours(23,59,59,999);
						var xDomain = d3.extent([start, end]);
						var xScale = d3.time.scale().domain(xDomain).range([0, timetableWidth]);

						for (var j = 0; j < planes[i].bookings.length; j++) {

							startDate = new Date(planes[i].bookings[j].start_date+'+10:00');
							endDate = new Date(planes[i].bookings[j].end_date+'+10:00');

							if (startDate.getTime() > start.getTime() && startDate.getTime() < end.getTime()) {

								planes[i].bookings[j].leftOffset = xScale(startDate);
								planes[i].bookings[j].durationWidth = Math.ceil(xScale(endDate) - xScale(startDate));

								var leftOffset = xScale(startDate),
									duration = Math.ceil(xScale(endDate) - leftOffset);

							}
							else {
								planes[i].bookings.splice(j, 1);

							}
						}	
					}

					if (typeof bookings !== 'undefined') {
						scope.bookings = planes;
					}

					// vertical rulers

					var start = new Date();
					var end = new Date();
					start.setHours(0,0,0,0);
					end.setHours(23,59,59,999);
					var xDomain = d3.extent([start, end]);
					var xScale = d3.time.scale().domain(xDomain).range([0, timetableWidth]);
					var ticks = xScale.ticks(24);

					for (var k = 0; k < ticks.length; k++) {
						var tick = ticks[k]; // this is a JS date
						var pos = Math.round(xScale(tick)); // this gets the date position based on x scale
						$(elem).append('<div class="vertical-rule" style="left: '+pos+'px;"></div>');
					}
				};

				

		}
	};

});
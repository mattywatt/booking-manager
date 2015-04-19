angular.module('schedulerApp')
       .directive('time',

function() {
	return {
		restrict: 'E',
		link: function(scope, elem, attrs) {

			var timetableWidth = 1000;

			var start = new Date();
			var end = new Date();
			start.setHours(0,0,0,0);
			end.setHours(23,59,59,999);

			var xDomain = d3.extent([start, end]);
			var xScale = d3.time.scale().domain(xDomain).range([0, timetableWidth]);

			var ticks = xScale.ticks(20);

			for (var i = 0; i < ticks.length; i++) {
				var tick = ticks[i]; // this is a JS date
				var pos = Math.round(xScale(tick)); // this gets the date position based on x scale
				var format = d3.time.format("%H:%M");
				var dateStr = format(tick);
				$(elem).append('<div class="x-tick" style="left: '+pos+'px;">'+dateStr+'</div>');
			}



		}
	};

});
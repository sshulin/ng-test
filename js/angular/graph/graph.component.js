// Register the 'graph' component on the 'graph' module,
angular.
	module('graph').
		component('graph', {
			templateUrl: 'js/angular/graph/graph.template.html',
			controller: [ '$timeout',
				function ListController($timeout) {
					var self = this;
					self.labels = [5,10,7,11,5,13,10,5,11,5,12,8];
					self.series = ['Series A'];
					self.data = [5,10,7,11,5,13,10,5,11,5,12,8];
					self.type = 'line';	
					self.lineDataset = {
						backgroundColor: "rgba(255,255,255,0)",
						borderColor: "rgba(66,66,66,1)"
					}
				}
			]
		});
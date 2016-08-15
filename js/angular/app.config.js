angular.
	module('pokeApp').
		config(['$locationProvider', '$routeProvider', 
			function config($locationProvider, $routeProvider) {
				$locationProvider.hashPrefix('!');

				$routeProvider.
					when('/list', {
						template: '<list></list>'
					}).
					when('/graph', {
						template: '<graph></graph>'
					}).
					when('/ball', {
						template: '<ball></ball>'
					}).
					otherwise('/list');
			}
			]);
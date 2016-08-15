// Register the 'List' component on the 'List' module,
angular.
	module('list').
		component('list', {
			templateUrl: 'js/angular/list/list.template.html',
			controller: ['localStorageService', 
				function ListController(localStorageService) {
					var self = this;
					self.setItems = function(){
						localStorageService.set('list', self.items);
					};
					self.getItems = function(){
						self.items = localStorageService.get('list');
					};
					self.toggleEditable = function(index){
						self.items[index].editable = !self.items[index].editable;
						self.setItems();
					};
					self.getItems();
					if(!self.items){
						self.items = [
							{
								id: 1,
								name: 'Item 01'
							},
							{
								id: 2,
								name: 'Item 02'
							},
							{
								id: 3,
								name: 'Item 03'
							},
							{
								id: 4,
								name: 'Item 04'
							},
							{
								id: 5,
								name: 'Item 05'
							}
						];						
					};
					self.dragControlListeners = {
						orderChanged: function(){
							self.setItems();
						}
					};
				}
			]
		});
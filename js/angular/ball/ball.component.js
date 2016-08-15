// Register the 'ball' component on the 'ball' module,
angular.
	module('ball').
		component('ball', {
			templateUrl: 'js/angular/ball/ball.template.html',
			controller: [ '$timeout',
				function ListController($timeout) {
					var self = this,
						canvas = document.getElementById('ballCanvas'),
						context = canvas.getContext('2d'),
						image = new Image();
					image.src = "http://image.flaticon.com/icons/png/128/26/26356.png";
					canvas.width = image.width;
					canvas.height = window.innerHeight * 0.5 || 
						document.documentElement.clientHeight * 0.5 ||
						document.body.clientHeight * 0.5;
					canvas.height = canvas.height + image.height * 0.5;
					canvas.style["margin-left"] = -canvas.width*0.5 + 'px';
					self.ball = {
						x: 0,
						y: 0
					};
					self.speed = 5;
					self.direction = 1;
					self.bouncing = true;
					self.draw = function(data){
						context.clearRect(0,0,canvas.width,canvas.height);
						context.drawImage(image, data.x, data.y);
						if(self.bouncing){
							if(self.direction < 100){
								self.ball.y+= self.speed * self.direction;
							}else{
								self.ball.y+= 100 * self.direction;
							}
						}
						if(self.ball.y >= canvas.height - image.height){
							self.direction = -1;
						}else if(self.ball.y <= 0){
							self.direction = 1;
						}
						setTimeout(function(){self.draw(data)}, 25);
					}
					context.drawImage(image, 0, 0);
					self.draw(self.ball);

					var doScroll = function (e) {
					    e = window.event || e;
					    var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
					    if(self.speed + delta > 0 && self.speed + delta < 100){
					    	self.speed+= delta;
					    }

					    e.preventDefault();
					};

					if (window.addEventListener) {
					    window.addEventListener("mousewheel", doScroll, false);
					    window.addEventListener("DOMMouseScroll", doScroll, false);
					} else {
					    window.attachEvent("onmousewheel", doScroll);
					}

				}
			]
		});
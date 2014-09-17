function TimeManager () {
	
	var self = this;

	self.interval = 5; // (saniye) istenilen iş girilme aralığı
	self.running = ko.observable(false);
	self.runTime = ko.observable(0);
	
	self.startTime = null;
	self.finishTime = null;

	self.timer = null;

	self.user = new User();
	self.tasks = ko.observableArray();

	self.totalTaskTime = ko.computed(function(){
		var time = self.tasks().length * self.interval,
			mins = time/60,
			hours = time/3600,
			ret = "";

			if(hours > 1) {
				ret = hours.toFixed(1) +" saat " + (time % 60) + " dakika";
			}
			else{
				ret = mins.toFixed(1) + " dakika";
			}

		return ret;
	});

	self.startTask = function () {
		var now = new Date();

		self.running(true);
		self.startTime = now.getHours() + ":" + (now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes() );
		self.timer = setInterval(function(){

			if(self.runTime() === self.interval){
				self.endTask();
			}
			else{
				self.runTime( self.runTime() + 1 );
			}

		}, 1000);
	};

	self.endTask = function(){
		var now = new Date();
		
		self.running(false);
		self.finishTime = now.getHours() + ":" + (now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes() );
		clearInterval(self.timer);
		self.runTime(0);

		var txt = prompt("Çalışma girişi açıklaması giriniz:", "");
		if(txt !== null){
			self.tasks.push(new Task({
				text: txt,
				start: self.startTime,
				finish: self.finishTime
			}));
		} 
	};

	self.deleteTask = function(task) {
		self.tasks.remove(task);
	};

	self.tweetTask = function(task){
		var begin = 'http://twitter.com/home?status=',
    		txt = task.start() + "~" + task.finish() + ": " + task.text(),
    		tweet = begin + encodeURIComponent(txt);

    	window.open(tweet, '_blank');
	};
}

var app = new TimeManager();
ko.applyBindings(app);
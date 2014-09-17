function Task(data){

	var self = this;

	data = data || { 
		text: "",
		start: "",
		finish: ""
	};

	self.text = ko.observable(data.text);
	self.start = ko.observable(data.start);
	self.finish = ko.observable(data.finish);
}
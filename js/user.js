function User () {
	var self = this;

	self.logged = ko.observable(false);
	self.email = ko.observable();
	self.name = ko.observable();

	self.logOut = function(){
		gapi.auth.signOut();
		self.logged(false);
	}
}

User.prototype.update = function(google_result) {
	this.logged(true);
	this.email(google_result.emails[0].value);
	this.name(google_result.displayName);
}

User.prototype.login = function () {
	var param = {
		'clientid' : '1032409806081-td787l3pj25blacp95fsurj7jddeqt89.apps.googleusercontent.com',
		'cookiepolicy' : 'single_host_origin',
		'callback' : 'loginCallback',
		'approvalprompt':'force',
		'scope' : 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read'
	};
	gapi.auth.signIn(param);
}
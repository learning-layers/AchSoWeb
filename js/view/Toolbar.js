Views.Extend('View.Toolbar', function(data) {
	var self = this;
	this.buttons = [];
	this.named = [];

	this.title = document.createElement('h1');
	this.e.appendChild(this.title);
	this.e.classList.add('Toolbar');

	this.video = data.video;

	this.video.observe('title', function(value) {
		self.setTitle(value);
	});
}, {
	setTitle: function(text) {
		this.title.textContent = text;
		return this;
	},
	addButton: function(button) {
		if(this.buttons.indexOf(button) < 0) {
			this.e.appendChild(button.e);
			var index = this.buttons.push(button) - 1;

			if(button.name) {
				this.named[index] = button.name;
			}
		}
		return this;
	},
	getButton: function(key) {
		if(typeof (key) === 'number') {
			return this.buttons[key];
		} else {
			return this.buttons[this.named.indexOf(key)];
		}
	}
});
Views.Extend('View', function(data) {
	this.e = document.createElement('div');
}, {
	setName: function(name) {
		this.name = name;
	},
	hide: function() {
		this.e.style.display = 'none';
		return this;
	},
	resetDisplay: function() {
		this.e.style.display = '';
		return this;
	},
	remove: function() {
		this.e.parentNode.removeChild(this.e);
		return this;
	}
});
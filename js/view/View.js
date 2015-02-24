Views.Extend('View', function(data) {
	this.e = document.createElement('div');
}, {
	setName: function(name) {
		this.name = name;
	},
	hide: function() {
		this.e.style.display = 'none';
	},
	resetDisplay: function() {
		this.e.style.display = '';
	}
});
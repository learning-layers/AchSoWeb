Views.Extend('View.Subtitle', function(data) {
	var self = this;
	this.setText(data.text);
	this.e.classList.add('Subtitle');
}, {
	setText: function(value) {
		this.e.textContent = value;
	}
});
Views.Extend('View.Progress', function(data) {
	var self = this;

	this.hide();
	this.e.classList.add('Progress');
	this.bar = document.createElement('progress');
	this.bar.max = 100;
	this.bar.value = 0;
	this.e.appendChild(this.bar);
}, {
	setValue: function(value) {
		if(value >= 100) {
			this.hide();
			this.bar.value = 0;
			return this;
		}
		this.resetDisplay();
		this.bar.value = value;
		return this;
	},
	reset: function() {
		this.bar.value = 0;
		return this;
	}
});
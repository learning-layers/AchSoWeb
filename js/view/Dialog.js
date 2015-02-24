Views.Extend('View.Dialog', function(data) {
	var self = this;
	this.actions = [];
	this.disabled = false;

	this.e.classList.add('Dialog');
	this.e.addEventListener('click', function() {
		self.act();
	});

	this.textContainer = document.createElement('div');
	this.textContainer.classList.add('Text');
	this.e.appendChild(this.textContainer);

	if(data.text) {
		this.setText(data.text);
	}

	var btn = Views.Create('View.Button', {
		text: l('Ok')
	}).addAction(function(done) {
		self.resetDisplay().remove();
		done();
	});
	this.e.appendChild(btn.e);
}, {
	setText: function(text) {
		this.textContainer.textContent = text;
		return this;
	},
	show: function() {
		document.getElementsByTagName('body')[0].appendChild(this.e);
		this.e.style.display = 'block';
		return this;
	}
});
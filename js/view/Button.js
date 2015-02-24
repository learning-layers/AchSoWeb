Views.Extend('View.Button', function(data) {
	var self = this;
	this.actions = [];
	this.disabled = false;

	this.e.classList.add('Button');
	this.e.addEventListener('click', function() {
		self.act();
	});

	if(data.text) {
		this.setText(data.text);
	}

	if(data.name) {
		this.setName(data.name);
	}
}, {
	disable: function() {
		this.e.classList.add('disabled');
		this.disabled = true;
		return this;
	},
	setText: function(text) {
		this.e.textContent = text;
		return this;
	},
	enable: function() {
		this.e.classList.remove('disabled');
		this.disabled = false;
		return this;
	},
	addAction: function(func) {
		this.actions.push(func);
		return this;
	},
	act: function(e) {
		if(this.disabled) {
			return this;
		}

		this.disable();

		var limit = this.actions.length;
		var count = 0;
		var self = this;

		for(var i = 0; i < this.actions.length; i++) {
			this.actions[i].call(this, function() {
				count++;
				if(count >= limit) {
					self.enable();
				}
			});
		}
		return this;
	}
});
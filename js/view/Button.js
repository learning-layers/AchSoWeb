Views.Extend('View.Button', function(data) {
	var self = this;
	this.actions = [];
	this.disabled = false;

	this.e.classList.add('Button');
	this.e.addEventListener('click', function() {
		self.act();
	});

	if(data.href) {
		this.a = document.createElement('a');
		this.a.setAttribute('href', data.href);
		this.a.setAttribute('target', '_blank');
		this.a.textContent = data.text;
		this.e.appendChild(this.a);
		this.href = data.href;
	}

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
		if(this.a) {
			this.a.textContent = text;
		} else {
			this.e.textContent = text;
		}
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

		var limit = this.actions.length;
		if(limit < 1) {
			return this;
		}

		this.disable();

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
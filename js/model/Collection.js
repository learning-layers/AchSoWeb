Collection = function() {
	var content = [];
	var index = [];

	var actions = {
		update: [],
		add: [],
		remove: []
	};

	this.add = function(value) {
		content.push(value);
		if(actions.add.length > 0) {
			for(var i = 0; i < actions.add.length; i++) {
				actions.add[i].call(value, value);
			}
		}
		return content.length - 1;
	};

	this.pop = function() {
		var value = content.pop();
		return value;
	};

	this.clear = function() {
		if(actions.remove.length > 0) {
			for(var i = 0; i < actions.remove.length; i++) {
				for(var j = 0; j < content.length; j++) {
					actions.remove[i].call(content[i], content[i]);
				}
			}
		}

		content = [];
		return this;
	};

	this.observe = function(action, func) {
		actions[action].push(func);
		return this;
	};

	this.match = function(func) {
		var a = [];

		for(var i = 0; i < content.length; i++) {
			if(func.call(content[i], i)) {
				a.push(content[i]);
			}
		}

		return a;
	};
};

Collection.prototype = {
	type: 'Collection'
};
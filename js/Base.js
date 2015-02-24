Base = {};

Store = function(type) {
	this.data = {};
	this.onUpdates = {};
	this.type = type;
};

Store.prototype = {
	data: {},
	onUpdates: {},
	onUpdate: function(property, func) {

	},
	add: function(data) {
		if(!data.id) {
			this.autoIndex++;
			data.id = this.autoIndex;
		}

		this.data[data.id] = data;
		return this;
	},
	type: '',
	autoIndex: 0
};
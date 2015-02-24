(function() {
	for(var part in Base) {
		var func = Base[part];
		var proto = Base[part].prototype;
		Base[part] = (function(func) {
			return function(data) {
				if(typeof (data) === 'undefined') {
					data = {};
				}
				var defaults = {};
				for(var i in this.__) {
					defaults[i] = this.__[i];
				}
				Object.defineProperty(this, '__', {
					enumerable: false,
					configurable: false,
					writable: false,
					value: {}
				});

				Object.defineProperty(this, '__observers', {
					enumerable: false,
					configurable: false,
					writable: false,
					value: {}
				});

				for(var i in data) {
					if(typeof (data[i]) !== 'object') {
						defaults[i] = data[i];
					}
				}

				for(var i in defaults) {
					if(typeof (defaults[i]) === 'function') {
						this.__[i] = defaults[i];
						continue;
					}

					if(typeof (defaults[i]) === 'object') {
						if(defaults[i].type) {
							this.__[i] = new Base[defaults[i].type](data[i]);
						}
					}

					if(typeof (defaults[i]) === 'function' && typeof (defaults[i].prototype) === 'object') {
						defaults[i] = new defaults[i](data[i]);
					}

				}

				func.apply(this, arguments);
			};
		})(func);

		Base[part].prototype = proto;
	}


	for(var part in Base) {
		var proto = Base[part].prototype;

		Object.defineProperty(proto, '__', {
			value: {},
			enumberable: false,
			configurable: true,
			writable: true
		});

		Object.defineProperty(proto, 'observe', {
			value: function(property, action) {
				if(!this.__observers[property]) {
					this.__observers[property] = [];
				}

				this.__observers[property].push(action);
				return this;
			},
			enumerable: false,
			confifuratble: false,
			writable: false
		});

		for(var j in proto) {
			if(j === 'type') {
				Object.defineProperty(proto, 'type', {
					value: proto[j],
					enumerable: false,
					configurable: false,
					writable: false
				});
				continue;
			}

			var value = proto[j];
			proto.__[j] = value;

			if(value.prototype) {
				if(value.prototype.type) {
					value = Base[value.prototype.type];
					proto.__[j] = value;
				}
			}

			(function(j, proto) {
				Object.defineProperty(proto, j, {
					enumerable: true,
					configurable: false,
					get: function() {
						return this.__[j];
					},
					set: function(value) {
						this.__[j] = value;
						if(this.__observers[j]) {
							var t = this;
							this.__observers[j].forEach(function(action) {
								action.call(t, value);
							});
						}
					}
				});
			}(j, proto));
		}
	}
})();
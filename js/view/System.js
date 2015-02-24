(function() {
	var ViewStorage = function(ViewConstructor) {
		var free = [];

		this.take = function(data) {
			if(free.length > 0) {
				return free.pop();
			} else {
				var e = ViewConstructor(data);
				return e;
			}
		};

		this.putBack = function(view) {
			view.hide();

			if(free.indexOf(view) === -1) {
				free.push(view);
			}

			return this;
		};
	};

	var System = function() {
		var storages = {};
		var constructors = {};
		var actions = {};
		var build = function() {

		};

		this.Extend = function(name, Constructor, methods) {
			var a = name.split('.');

			constructors[a[a.length - 1]] = Constructor;
			actions[a[a.length - 1]] = methods;
			var builder = function(data) {
				var o = {};

				for(var i = 0; i < a.length; i++) {
					for(var j in actions[a[i]]) {
						o[j] = actions[a[i]][j];
					}

					constructors[a[i]].call(o, data);
				}
				return o;
			};

			storages[name] = new ViewStorage(builder);
			return this;
		};

		this.Create = function(name, data) {
			var obj = storages[name].take(data);
			return obj;
		};
	};
	window.Views = new System();
})();
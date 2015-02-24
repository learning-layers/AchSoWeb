Ajax = function(options, callback) {
	var xhr = new XMLHttpRequest();

	var verb = options.method | 'GET';

	xhr.onreadystatechange = function() {
		if(xhr.readyState === 4) {
			if(callback) {
				callback(JSON.parse(xhr.responseText));
			}
		}
	};
	xhr.open(verb, options.url, true);
	xhr.send();
};

Ajax.prototype = {
};
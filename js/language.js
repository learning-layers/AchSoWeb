(function() {
	var current = 'en';

	if(navigator.language.toLowerCase().indexOf('fi') > -1) {
		current = 'fi';
	}

	var L = {
		en: {
			'button.OpenFromService': 'Open from Cloud',
			'button.OpenLocal': 'Open from Disk',
			'button.Login': 'Authorize',
			'Play': 'Play',
			'Pause': 'Pause',
			'Ok': 'Ok',
			'error.InvalidFile': 'Could not open file'
		},
		fi: {
			'button.OpenFromService': 'Avaa palvelimelta',
			'button.OpenLocal': 'Avaa tietokoneelta',
			'button.Login': 'Kirjaudu',
			'Play': 'Toista',
			'Pause': 'Pysäytä',
			'Ok': 'Ok',
			'error.InvalidFile': 'Valittus tiedostoa ei voitu toistaa'
		}
	};

	window.l = function(key) {
		if(L[current][key]) {
			return L[current][key];
		}
		return '[' + key + ']';
	};
})();
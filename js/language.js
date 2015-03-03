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
			'error.InvalidFile': 'Could not open file',
			'url.Userguide': 'https://docs.google.com/document/d/1ADy02QCLh2G5kY_Jn6x3WAxDu91Pwn2hVMlrdDJMDdw/edit?usp=sharing'
		},
		fi: {
			'button.OpenFromService': 'Avaa palvelimelta',
			'button.OpenLocal': 'Avaa tietokoneelta',
			'button.Login': 'Kirjaudu',
			'Play': 'Toista',
			'Pause': 'Pysäytä',
			'Ok': 'Ok',
			'error.InvalidFile': 'Valittua tiedostoa ei voitu toistaa',
			'url.Userguide': 'https://docs.google.com/document/d/1ADy02QCLh2G5kY_Jn6x3WAxDu91Pwn2hVMlrdDJMDdw/edit?usp=sharing'
		}
	};

	window.l = function(key) {
		if(L[current][key]) {
			return L[current][key];
		}
		return '[' + key + ']';
	};
})();
(function() {
	document.addEventListener('DOMContentLoaded', function() {
		var player = Views.Create('View.Player', {});

		player.toolbar.addButton(Views.Create('View.Button', {
			text: l('button.OpenLocal'),
			name: 'openLocal'
		}).addAction(function(done) {
			var click = new MouseEvent('click', {
				'view': window,
				'bubbles': true,
				'cancelable': true
			});
			document.getElementById('localFile').dispatchEvent(click);
			done();
		}));

		document.getElementById('localFile').addEventListener('change', function(evt) {
			var file = evt.target.files[0];

			// Check if the file is one of the supported ones
			if(file.name.indexOf('.achso') != file.name.length - 6) {
				var dialog = Views.Create('View.Dialog', {text: l('error.InvalidFile')});
				dialog.show();
				return this;
			}
			player.video.readFile(file, function() {

			});
		});

		player.toolbar.addButton(Views.Create('View.Button', {
			text: l('button.OpenFromService'),
			name: 'open'
		}).addAction(function(done) {
			GOOGLE_PUBLIC_ACTION.requestPick(function(data) {
				if(data.action === 'picked') {
					done();
					GOOGLE_PUBLIC_ACTION.downloadFile(data.docs[0].id, function(file) {
						player.video.readFile(file, function() {

						});
					}, function(percent) {
						player.video.loaded = percent;
					});
				}
			});
			done();
		}));

		player.toolbar.addButton(Views.Create('View.Button', {
			text: l('button.Login'),
			name: 'login'
		}).addAction(function(done) {
			GOOGLE_PUBLIC_ACTION.requestLogin();
			done();
		}));

		GOOGLE_PUBLIC_ACTION.isAuthorized(function(authorized) {
			if(authorized) {
				player.toolbar.getButton('login').hide();
				player.toolbar.getButton('open').resetDisplay();
			} else {
				player.toolbar.getButton('open').hide();
				player.toolbar.getButton('login').resetDisplay();
			}
		});
	});
})();


/*
 * Abstraction layer between the app and Google API services
 */

(function() {
	var CONF = {
		BASE_URL: GOOGLE.BASE_URL,
		CLIENT_ID: GOOGLE.CLIENT_ID,
		SCOPES: GOOGLE.SCOPES,
		DEV_KEY: GOOGLE.DEV_KEY
	};
	var STATUS = {
		CLIENT_READY: false,
		PICKER_API_READY: false,
		DRIVE_API_READY: false,
		AUTHORIZED: false
	};

	var waitingActions = [];

	var ACTION = {
		checkAuthorization: function(func) {
			var callback = ACTION.handleAuthorization;
			if(func) {
				callback = function(authResult) {
					ACTION.handleAuthorization(authResult);
					func(STATUS.AUTHORIZED);
				};
			}

			gapi.auth.authorize({
				'client_id': CONF.CLIENT_ID,
				'scope': CONF.SCOPES,
				'immediate': true
			}, callback);
			return this;
		},
		loadPickerAPI: function() {
			gapi.load('picker', {
				'callback': function() {
					STATUS.PICKER_API_READY = true;
				}
			});
			return this;
		},
		loadDriveAPI: function() {
			gapi.client.load('drive', 'v2', function() {
				STATUS.DRIVE_API_READY = true;
			});
			return this;
		},
		handleAuthorization: function(authResult) {
			if(authResult && !authResult.error) {
				// Access token has been successfully retrieved, requests can be sent to the API.
				STATUS.AUTHORIZED = authResult.access_token
			}
		},
		clientLoad: function() {
			STATUS.CLIENT_READY = true;
			ACTION.checkAuthorization().loadPickerAPI().loadDriveAPI();

			for(var i = 0; i < waitingActions.length; i++) {
				waitingActions[i]();
			}

			return this;
		},
		createPickerView: function() {
			var view = new google.picker.View(google.picker.ViewId.DOCS);
			view.setMimeTypes('application/x-zip,application/achso');
			view.setLabel('Ach so!');
			return view;
		},
		createPicker: function(func) {
			if(STATUS.PICKER_API_READY && STATUS.AUTHORIZED) {
				var picker = new google.picker.PickerBuilder().addView(ACTION.createPickerView()).setOAuthToken(STATUS.AUTHORIZED).setDeveloperKey(CONF.DEV_KEY).setCallback(func).build();
				picker.setVisible(true);
			}
		},
		getFileDetails: function(id, func) {
			var req = gapi.client.drive.files.get({
				fileId: id
			});
			req.execute(func);
		},
		getFileContent: function(file, callback, progress) {
			if(file.downloadUrl) {
				//document.getElementById('loadingPercent').textContent = '0 %';
				var accessToken = gapi.auth.getToken().access_token;
				var xhr = new XMLHttpRequest();
				var size = file.fileSize;
				xhr.open('GET', file.downloadUrl);
				xhr.responseType = 'blob';
				xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
				xhr.onload = function() {
					callback(xhr.response);
				};
				xhr.onprogress = function(e) {
					var percent = Math.round(e.loaded / size * 100);
					progress(percent);
				};
				xhr.onerror = function() {
					callback(null);
				};
				xhr.send();
			} else {
				callback(null);
			}
		}
	};

	window.GOOGLE_PUBLIC_ACTION = {
		downloadFile: function(file, func, prog) {
			if(typeof (file) !== 'object') {
				ACTION.getFileDetails(file, function(content) {
					GOOGLE_PUBLIC_ACTION.downloadFile(content, func, prog);
				});
				return;
			}

			ACTION.getFileContent(file, func, prog);
		},
		requestPick: function(func) {
			ACTION.createPicker(func);
			return this;
		},
		isAuthorized: function(func) {
			if(STATUS.CLIENT_READY) {
				ACTION.checkAuthorization(func);
			} else {
				waitingActions.push(function() {
					GOOGLE_PUBLIC_ACTION.isAuthorized(func);
				});
			}

			return this;
		},
		requestLogin: function(func) {
			gapi.auth.authorize({
				'client_id': CONF.CLIENT_ID,
				'scope': CONF.SCOPES,
				'immediate': false
			}, function() {
				ACTION.handleAuthorization();
				if(func) {
					func();
				}
			});
			return this;
		}
	};

	window.GOOGLE_API_CALLBACK = function() {
		ACTION.clientLoad();
	};
})();
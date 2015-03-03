Base.Video = function(data, callback) {
	if(data.file) {
		this.readFile(data.file);
	}

	this.observe('length', function(value) {
		this.ratio = value / 100;
		this.currentPosition = 0;
	});

	this.annotations = new Collection();
};

Base.Video.prototype = {
	title: '',
	blob: false,
	play: false,
	loaded: 0,
	length: 0,
	height: 0,
	width: 0,
	currentHeight: 0,
	currentWidth: 0,
	currentPosition: 0,
	ratio: 1,
	readFile: function(file, callback) {
		// Check if the file is one of the supported ones
		var allowedTypes = ['achso'];

		var name = file.name || 'achso';
		if(allowedTypes.indexOf(name.split('.').pop()) === -1) {
			var dialog = Views.Create('View.Dialog', {text: l('error.InvalidFile')});
			dialog.show();
			return this;
		}

		var self = this;
		var reader = new FileReader();
		reader.onload = function(e) {
			self.awakeFromFile(e.target.result, callback);
		};

		reader.readAsArrayBuffer(file);
	},
	awakeFromFile: function(input, callback) {
		var zip = new JSZip(input);

		for(var i in zip.files) {
			var file = zip.files[i];

			if(file.name.indexOf('/.') > -1) {
				continue;
			}

			if(file.name.indexOf('.json') > -1) {
				this.fromJSON(JSON.parse(file.asText()));
			}

			if(file.name.indexOf('.mp4') > -1) {
				this.createBlob(file);
			}
		}

		callback.call(this);
	},
	createBlob: function(video) {
		this.blob = new Blob([video.asUint8Array()], {
			type: 'video/mp4'
		});

		return this;
	},
	fromJSON: function(json) {
		this.title = json.title;

		this.annotations.clear();
		if(json.annotations) {
			for(var i = 0; i < json.annotations.length; i++) {
				var anno = new Base.Annotation(json.annotations[i]);
				this.annotations.add(anno);
			}
		}

		return this;
	}
};
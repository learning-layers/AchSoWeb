Views.Extend('View.Video', function(data) {
	var self = this;

	var videoInterval = 0;
	var videoIntervalAction = function() {
		self.video.currentPosition = self.videoElement.currentTime * 1000;
	};

	this.videoElement = document.createElement('video');
	this.videoElement.addEventListener('loadedmetadata', function(e) {
		var len = self.videoElement.duration;
		self.video.length = len * 1000;
		self.video.height = self.videoElement.videoHeight;
		self.video.width = self.videoElement.videoWidth;

		self.resizeAction();
	});

	// Jump back to start of video and pause it when playback ends
	this.videoElement.addEventListener('ended', function() {
		self.video.play = false;
		self.video.currentPosition = 0;
	});

	this.video = data.video;
	this.video.observe('blob', function(value) {
		self.videoElement.src = window.URL.createObjectURL(value);
	});

	this.pauseFor = function(time) {
		if(this.video.play !== true) {
			return this;
		}

		this.video.play = false;
		setTimeout(function() {
			self.video.play = true;
		}, time);
	};

	this.video.observe('play', function(value) {
		if(value === true) {
			self.videoElement.play();
			videoInterval = setInterval(videoIntervalAction, 10);
		} else {
			self.videoElement.pause();
			clearInterval(videoInterval);
		}
	}).observe('currentPosition', function(value) {
		if(!self.video.play) {
			self.videoElement.currentTime = value / 1000;
		}

		var a = self.video.annotations.match(function() {
			if(this.consumed) {
				if(value < this.time) {
					this.consumed = false;
					if(this.view) {
						this.view.hide();
						this.subtitle.hide();
					}
				} else {
					if(this.view) {
						this.view.hide();
						this.subtitle.hide();
					}
				}
				return false;
			}

			if(self.video.play) {
				return value >= this.time;
			} else {
				// Note that when clicking the annotation icon in the seekerbar the position given by browser is of by 10
				if(this.time < value) {
					this.consumed = true;
				}
				return Math.abs(value - this.time) < 20;
			}
		});

		if(a.length > 0) {
			self.videoElement.pause();
			var pause = 0;
			for(var i = 0; i < a.length; i++) {
				var anno = a[i];
				anno.consumed = true;
				pause = pause + anno.length;
				if(!anno.view) {
					anno.subtitle = Views.Create('View.Subtitle', {
						text: anno.text
					});

					var view = Views.Create('View.VideoAnnotation', {
						annotation: anno
					});
					anno.view = view;
					self.subtitleSurface.appendChild(anno.subtitle.e);
					self.annotationSurface.appendChild(view.e);
				} else {
					anno.view.resetDisplay();
					anno.subtitle.resetDisplay();
				}
			}

			self.pauseFor(pause);
		}
	}).annotations.observe('add', function(value) {
		//console.log(value);
	});

	this.e.classList.add('VideoContainer');

	this.resizeEvent = window.addEventListener('resize', function() {
		self.resizeAction();
		return this;
	});

	this.resizeAction = function() {
		var rect = this.e.getBoundingClientRect();

		var heiRatio = rect.height / self.video.height;
		var widRatio = rect.width / self.video.width;

		if(heiRatio < widRatio) {
			self.video.currentHeight = rect.height;
			self.video.currentWidth = self.video.width * heiRatio;
		} else {
			self.video.currentWidth = rect.width;
			self.video.currentHeight = self.video.height * widRatio;
		}
	};

	this.video.observe('currentHeight', function(value) {
		var rect = self.e.getBoundingClientRect();
		self.videoElement.style.height = value + 'px';

		var diff = (rect.height - value) / 2;

		self.videoElement.style.top = diff + 'px';
		self.annotationSurface.style.height = value + 'px';
		self.annotationSurface.style.top = diff + 'px';
	});

	this.video.observe('currentWidth', function(value) {
		var rect = self.e.getBoundingClientRect();
		self.videoElement.style.width = value + 'px';

		var diff = (rect.width - value) / 2;

		self.videoElement.style.left = diff + 'px';
		self.annotationSurface.style.width = value + 'px';
		self.annotationSurface.style.left = diff + 'px';
	});

	this.annotationSurface = document.createElement('div');
	this.annotationSurface.classList.add('AnnotationSurface');

	this.subtitleSurface = document.createElement('div');
	this.subtitleSurface.classList.add('SubtitleSurface');

	this.e.appendChild(this.videoElement);
	this.e.appendChild(this.annotationSurface);
	this.e.appendChild(this.subtitleSurface);

	this.controller = Views.Create('View.VideoController', {
		video: this.video
	});
	this.e.appendChild(this.controller.e);
}, {});

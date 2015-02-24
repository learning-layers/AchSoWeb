Views.Extend('View.VideoController', function(data) {
	var self = this;
	this.video = data.video;

	this.playButton = Views.Create('View.Button', {
		text: l('Play'),
		name: 'play'
	}).addAction(function(done) {
		self.video.play = !self.video.play;
		done();
	});

	this.e.appendChild(this.playButton.e);

	this.seekerContainer = document.createElement('div');
	this.seekerContainer.classList.add('SeekerContainer');
	this.e.appendChild(this.seekerContainer);

	this.video.annotations.observe('add', function(annotation) {
		var annotationView = Views.Create('View.SeekerAnnotation', {
			annotation: annotation,
			video: self.video
		});
		annotation.seeker = annotationView;
		self.seekerContainer.appendChild(annotationView.e);
	}).observe('remove', function() {
		this.seeker.hide();
	});

	this.seeker = document.createElement('input');
	this.seeker.type = 'range';
	this.seeker.step = 0.1;
	this.seeker.max = 100;

	var pausedByDragging = false;

	// Set video position when user changes the position of seeker
	this.seeker.addEventListener('change', function() {
		var value = self.seeker.value;
		var position = self.video.ratio * value;

		self.video.currentPosition = position;

		// Continue playback if it was paused for dragging
		if(pausedByDragging) {
			self.video.play = true;
		}
	});

	// Playback will be paused when user is dragging the seeker
	this.seeker.addEventListener('mousedown', function() {
		pausedByDragging = self.video.play;
		self.video.play = false;
	});

	this.seekerContainer.appendChild(this.seeker);

	this.e.classList.add('VideoController');

	this.video.observe('currentPosition', function(value) {
		self.seeker.value = value / this.ratio;
	}).observe('play', function(value) {
		if(value) {
			self.playButton.setText(l('Pause'));
		} else {
			self.playButton.setText(l('Play'));
		}
	});
}, {});
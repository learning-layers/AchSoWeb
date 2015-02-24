Views.Extend('View.Player', function(data) {
	var self = this;

	document.getElementsByTagName('body')[0].appendChild(this.e);
	this.e.classList.add('Player');

	this.video = new Base.Video({});

	this.videoView = Views.Create('View.Video', {
		video: this.video
	});
	this.e.appendChild(this.videoView.e);

	this.toolbar = Views.Create('View.Toolbar', {
		video: this.video
	});
	this.toolbar.setTitle('Ach so!');
	this.e.appendChild(this.toolbar.e);

	this.progress = Views.Create('View.Progress', {
	});

	this.e.appendChild(this.progress.e);

	this.video.observe('loaded', function(value) {
		self.progress.setValue(value);
	});
}, {
});
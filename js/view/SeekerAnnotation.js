Views.Extend('View.SeekerAnnotation', function(data) {
	var self = this;
	this.annotation = data.annotation;
	this.video = data.video;

	this.e.classList.add('Annotation');

	this.annotation.observe('time', function(value) {
		self.countPosition(value);
	});

	this.video.observe('ratio', function(value) {
		self.countPosition(self.annotation.time);
	});

	this.countPosition(this.annotation.time);

	this.e.addEventListener('click', function() {
		self.annotation.consumed = false;

		self.video.annotations.match(function() {
			if(this.time < self.annotation.time) {
				this.consumed = true;
			}
		});

		self.video.currentPosition = self.annotation.time + 10;
	});
}, {
	countPosition: function(time) {
		var place = time / this.video.ratio;
		this.e.style.left = place + '%';
	}
});
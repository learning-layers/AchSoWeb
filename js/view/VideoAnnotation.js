Views.Extend('View.VideoAnnotation', function(data) {
	var self = this;
	this.annotation = data.annotation;

	this.e.classList.add('Annotation');
	this.e.style.left = this.annotation.position.x * 100 + '%';
	this.e.style.top = this.annotation.position.y * 100 + '%';
}, {
});
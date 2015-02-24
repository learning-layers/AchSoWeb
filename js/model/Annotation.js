Base.Position = function(data) {
	this.x = data.x;
	this.y = data.y;
};

Base.Position.prototype = {
	type: 'Position',
	x: 0.0,
	y: 0.0
};

Base.Author = function() {

};

Base.Author.prototype = {
	type: 'Author',
	name: '',
	uri: ''
};

Base.Annotation = function(data) {
	this.observe('text', function(value) {
		this.length = 2000 + 60 * value.length;
	});

	if(data) {
		this.text = data.text;
		this.time = data.time;
	}
};

Base.Annotation.prototype = {
	type: 'Annotation',
	consumed: false,
	position: {
		type: 'Position'
	},
	time: 0,
	length: 2000,
	text: '',
	author: {
		type: 'Author'
	}
};
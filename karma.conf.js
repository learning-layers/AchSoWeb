/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

module.exports = function(config) {
	config.set({
		basePath: './',
		files: [
			'js/Base.js',
			'js/model/*',
			'js/view/System.js',
			'js/view/View.js',
			'js/view/*',
			'js/controller/*',
			'js/start.js',
			'test/unit/**.js'
		],
		exclude: [
		],
		autoWatch: true,
		frameworks: ['jasmine'],
		browsers: ['Chrome'],
		plugins: [
			'karma-junit-reporter',
			'karma-chrome-launcher',
			'karma-script-launcher',
			'karma-jasmine'
		]
	});
};

/*global TheGame, $, Marionette*/

window.TheGame = {
	Models:      {},
	Collections: {},
	Views:       {},
	Routers:     {},
	init:        function () {
		'use strict';

		var GameManager = new Marionette.Application();

		GameManager.addRegions({
			header: '#header',
			main: '#main',
			footer: '#footer'
		});

		GameManager.on('initialize:after', function () {
			if ( Backbone.history ) {
				Backbone.history.start();
			}
		});

		GameManager.start();
		return GameManager;
	}
};

$(document).ready(function () {
	'use strict';
	TheGame.init();

	//Just a dummy data for now
	var test = [

		{ name: 'Test', priority: '2' },
		{ name: 'Getting', description: '2', priority: '1' },
		{ name: 'Quests', description: '3', priority: '2' },
		{ name: 'Done', description: '4', priority: '3' }
	];
	new TheGame.Views.Main(test);

});

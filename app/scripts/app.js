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

	new TheGame.Views.Main();

});

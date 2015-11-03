/*global TheGame, Backbone*/

TheGame.Models = TheGame.Models || {};

(function () {
	'use strict';

	TheGame.Models.Quest = Backbone.Model.extend({

		initialize: function () {
		},

		defaults: {
			description: '',
			priority:    {0: true},
			comments: ""

		},

		validate: function ( attrs, options ) {
		},

		parse: function ( response ) {
			response.id = response._id;
			return response;
		}
	});

})();

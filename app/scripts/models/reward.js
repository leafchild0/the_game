/*global TheGame, Backbone*/

TheGame.Models = TheGame.Models || {};

(function () {
	'use strict';

	TheGame.Models.Reward = Backbone.Model.extend({

		url: '',

		initialize: function () {
		},

		defaults: {},

		validate: function ( attrs, options ) {
		},

		parse: function ( response ) {
			response.id = response._id;
			return response;
		}
	});

})();

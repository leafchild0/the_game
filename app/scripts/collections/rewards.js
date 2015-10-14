/*global TheGame, Backbone*/

TheGame.Collections = TheGame.Collections || {};

(function () {
	'use strict';

	TheGame.Collections.Rewards = Backbone.Collection.extend({

		model: TheGame.Models.Reward,
		url:   '/rewards'

	});

})();

/*global TheGame, Backbone*/

TheGame.Collections = TheGame.Collections || {};

(function () {
	'use strict';

	TheGame.Collections.Quests = Backbone.Collection.extend({

		model: TheGame.Models.Quest,
		url: 'api/quests'

	});

})();

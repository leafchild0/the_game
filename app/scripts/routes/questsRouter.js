/*global TheGame, Backbone*/

TheGame.Routers = TheGame.Routers || {};

(function () {
	'use strict';

	TheGame.Routers.QuestRouter = Backbone.Router.extend({
		routes: {
			'*filter': 'setFilter'
		},

		setFilter: function ( param ) {
			// Set the current filter to be used
			TheGame.QuestsFilter = param.trim() || '';

			// Trigger a collection filter event, causing hiding/unhiding
			//TODO Need to update the reference
			TheGame.Collections.Quests.trigger('filter');
		}
	});

}());

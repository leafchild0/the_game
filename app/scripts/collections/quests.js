/*global TheGame, Backbone*/

TheGame.Collections = TheGame.Collections || {};

(function () {
	'use strict';

	TheGame.Collections.Quests = Backbone.Collection.extend({

		model: TheGame.Models.Quest,
		url: 'api/quests',

		returnByType : function(type){
			return _(this.filter(function(data) {
				return data.get('type') == type;
			}));
		},

		search : function(type, letters){
			if(letters == "") return this;

			var pattern = new RegExp(letters,"gi");
			return _(this.filter(function(data) {
				return data.get('type') === type && pattern.test(data.get("name"));
			}));
		}

	});

})();

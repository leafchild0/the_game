/*global TheGame, Backbone*/

TheGame.Views = TheGame.Views || {};

(function () {
	'use strict';

	TheGame.Views.EditQuest = Backbone.View.extend({

		tagName: 'div',

		id: '',

		className: '',

		events: {},

		initialize: function () {
			this.listenTo(this.model, 'change', this.render);
		},

		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
		}

	});

})();

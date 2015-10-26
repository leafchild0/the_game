/*global TheGame, Marionette*/

TheGame.Views = TheGame.Views || {};

(function () {
	'use strict';

	TheGame.Views.QuestView = Marionette.ItemView.extend({

		tagName: 'div',

		className: 'newQuest',

		template: _.template($('#questTemplate').html()),

		events: {
			'click .delete': 'deleteQuest'
		},

		initialize: function () {
			this.listenTo(this.model, 'change', this.render);
		},

		render: function () {
			this.$el.html(this.template(this.model.toJSON()));

			return this;
		},

		deleteQuest: function() {
			// Delete model
			this.model.destroy();
			// Delete view
			this.remove();
		}

	});

})();

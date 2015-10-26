/*global TheGame, Marionette*/

TheGame.Views = TheGame.Views || {};

(function () {
	'use strict';

	TheGame.Views.EditQuestView = Marionette.ItemView.extend({

		tagName: 'div',

		className: 'questDetails',

		template: _.template($('#questDetailsTemplate').html()),

		events: {
			'click .close': 'close'
		},

		initialize: function () {
			this.listenTo(this.model, 'change', this.render);
		},

		render: function () {
			this.$el.html(this.template(this.model.toJSON()));

			return this;
		},

		close: function() {
			// Delete view
			this.remove();
		}

	});

})();

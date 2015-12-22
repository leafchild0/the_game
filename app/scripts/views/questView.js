/*global TheGame, Marionette*/

TheGame.Views = TheGame.Views || {};

(function () {
	'use strict';

	TheGame.Views.QuestView = Marionette.ItemView.extend({

		tagName: 'div',

		className: 'newQuest row col-sm-8',

		template: _.template($('#questTemplate').html()),

		events: {
			'click .delete': 'deleteQuest'
		},

		initialize: function () {
			this.listenTo(this.model, 'change', this.render);
		},

		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
			this.generateBadges(this.model.get('type'), this.$el);
			return this;
		},

		/**
		 * void method originally
		 * adds badges to be displayed by simply
		 * adding classes to a span elements
		 * @param type - type of item
		 * @param elem - cached $el
		 */
		generateBadges: function( type, elem ) {

			var span = elem.find( '#questType' ),
				  className;
			if( type === 'quest' ) className = 'fa-book';
			else className = 'fa-trophy';

			span.addClass( className );
		},

		deleteQuest: function() {
			// Delete model
			this.model.destroy();
			// Delete view
			this.remove();
		}

	});

})();

/*global TheGame, Marionette*/

TheGame.Views = TheGame.Views || {};

(function () {
	'use strict';

	TheGame.Views.EditReward = Marionette.CompositeView.extend({

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
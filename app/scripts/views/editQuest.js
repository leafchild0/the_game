/*global TheGame, Marionette*/

TheGame.Views = TheGame.Views || {};

(function () {
	'use strict';

	TheGame.Views.EditQuestView = Marionette.ItemView.extend({

		tagName: 'div',

		className: 'questDetails',

		template: _.template($('#questDetailsTemplate').html()),

		events: {
			'click .close': 'close',
			'click .save':  'saveEdits'
		},

		initialize: function () {
			this.listenTo(this.model, 'change', this.render);
		},

		render: function () {
			this.$el.html(this.template(this.model.toJSON()));

			return this;
		},

		close: function () {
			// Delete view
			this.remove();
		},

		saveEdits: function () {
			//  Update the model
			//Get all the data
			var name = $('#qnameEdit'),
				  description = $('#qdescriptionEdit'),
				  priority = $('#qpriorityEdit');

			this.updateModelData('name', name.val());
			this.updateModelData('description', description.val());
			this.updateModelData('priority', priority.val());

			this.close()
		},

		updateModelData: function ( name, value ) {
			if ( value !== '' ) this.model.set(name, value);
		}

	});

})();

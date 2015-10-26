/*global TheGame, Marionette*/

TheGame.Views = TheGame.Views || {};

(function () {
	'use strict';

	TheGame.Views.Main = Backbone.View.extend({
		el: '#quests',

		events: {
			'click #add':            'addQuest',
			'dblclick div.newQuest': 'showQuestView'
		},

		initialize: function ( initialQuests ) {
			this.collection = new TheGame.Collections.Quests(initialQuests);
			this.render();

			//this.listenTo(this.collection, 'change', this.render);
			this.listenTo(this.collection, 'reset', this.render);
			this.listenTo(this.collection, 'add', this.renderQuest);
		},

		render: function () {
			var that = this;
			this.collection.each(function ( item ) {
				that.renderQuest(item);
			});

			return this;
		},

		renderQuest: function ( quest ) {
			var questsView = new TheGame.Views.QuestView({ model: quest });
			this.$el.append(questsView.render().el);
		},

		addQuest:      function ( e ) {

			e.preventDefault();
			var $newTitle = $('#name');
			var titleValue = $newTitle.val();

			//TODO: Add a validation + name unique
			if ( titleValue !== '' ) {
				//Create a new model
				var newQuest = new TheGame.Models.Quest({ name: titleValue });
				//Stab for a DB save
				//this.collection.create({ name: $newTitle });
				//Otherwise
				this.renderQuest(newQuest);
			}

			// Clear input field value
			$newTitle.val('');

		},
		showQuestView: function ( e ) {

			var questModel;
			// Find clicked target
			// Get the target quest
			//Create a new view
			//Render a new view
			var target = $(e.target);
			var questTitle = target.children("ul").children("li").html();
			if ( !questTitle ) questTitle = target.html();

			//Got the name of the quest
			//Getting the model
			if ( questTitle ) {
				questModel = this.collection.where({ name: questTitle })[ 0 ];
			}

			//Create a new view
			var editQuest = new TheGame.Views.EditQuestView({ model: questModel });
			this.$el.append(editQuest.render().el);
		}

	});

})();

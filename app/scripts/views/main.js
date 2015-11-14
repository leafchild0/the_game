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
			this.collection.fetch();
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

		addQuest: function ( e ) {

			e.preventDefault();
			var $newTitle = $('#name'),
				  titleValue = $newTitle.val();

			//TODO: Add a validation + name unique
			if ( titleValue !== '' ) {
				//Create a new model
				var newQuest = new TheGame.Models.Quest({ name: titleValue });

				//Stab for a DB save
				this.collection.create(newQuest);
				//Otherwise
				//this.collection.add(newQuest);
			}

			// Clear input field value
			$newTitle.val('');

		},
		showQuestView: function ( e ) {

			var questModel,
				  target = $(e.target),
				  questTitle = target.children("ul").children("li").html(),
				  $detailedView = this.$el.find('.questDetails');

			//Check if detailed view already appended
			if ( $detailedView.html() ) $detailedView.slideUp("fast", function () {
				this.remove();
			});


			if ( !questTitle ) questTitle = target.html();

			//Got the name of the quest
			//Getting the model
			if ( questTitle ) {
				questModel = this.collection.where({ name: questTitle })[ 0 ];
			}

			//Create a new view
			var editQuest = new TheGame.Views.EditQuestView({ model: questModel });
			//Append newly created view to the dom
			this.$el.append(editQuest.render().el).end().slideUp("fast");
		}

	});

})();

/*global TheGame, Backbone*/

TheGame.Views = TheGame.Views || {};

(function () {
	'use strict';

	TheGame.Views.Main = Backbone.View.extend({
            el: '#quests',

		events: {
			'click #add': 'addQuest',
			'click .questContainer': 'showQuestView'
		},

		initialize: function (initialQuests ) {
			this.collection = new TheGame.Collections.Quests(initialQuests);
			this.render();

			//this.listenTo(this.collection, 'change', this.render);
			this.listenTo(this.collection, 'reset', this.render);
			this.listenTo(this.collection, 'add', this.renderQuest);
		},

		render: function () {
			var that = this;
			this.collection.each(function (item) {
				that.renderQuest(item);
			});

			return this;
		},

		renderQuest: function(quest) {
			var questsView = new TheGame.Views.QuestView( {model: quest} );
			this.$el.append(questsView.render().el);
		},

		addQuest: function ( e ) {

			e.preventDefault();
			var $newTitle = $('#name');
			var titleValue = $newTitle.val();

			if(titleValue !== '') {
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

		showQuestView: function(e) {
			console.log('Clicked ' + e.target.innerHTML);
		}

	});

})();

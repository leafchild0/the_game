/*global TheGame, Marionette*/

TheGame.Views = TheGame.Views || {};

(function() {
	'use strict';

	TheGame.Views.Main = Backbone.View.extend( {
		el: '#quests',

		events: {
			'click #add':                   'addQuest',
			'dblclick div.newQuest':        'showQuestView',
			'change div#questreward input': 'displayByType',
			"keyup #searchTask":            "performSearch"
		},

		initialize: function( initialQuests ) {

			this.collection = new TheGame.Collections.Quests( initialQuests );
			//this.listenTo(this.collection, 'change', this.render);
			this.listenTo( this.collection, 'reset', this.render );
			this.listenTo( this.collection, 'add', this.renderQuest );

			this.collection.fetch();
			this.render();

		},

		render: function( tasks ) {

			//cleanup
			//will not be fired at the first time
			$( 'div.newQuest' ).remove();

			var that = this;
			var tasksToRender = tasks || this.collection.returnByType( 'quest' ) || this.collection;
			tasksToRender.each( function( item ) {
				that.renderQuest( item );
			} );

			return this;
		},

		renderQuest: function( quest ) {
			var questsView = new TheGame.Views.QuestView( { model: quest } );
			this.$el.append( questsView.render().el );

		},


		addQuest: function( e ) {
			e.preventDefault();
			var $newTitle = $( '#name' ),
				  titleValue = $newTitle.val(),
				  itemType = $( 'div#questreward input:checked' ).attr( 'id' ), newItem;

			//TODO: Add a validation + name unique
			if( titleValue !== '' ) {
				//Create a new model
				newItem = new TheGame.Models.Quest( { name: titleValue, type: itemType || 'quest' } );

				this.collection.create( newItem );
			}

			// Clear input field value
			$newTitle.val( '' );

		},

		showQuestView: function( e ) {

			var questModel,
				  target = $( e.target ),
				  questTitle = target.find( " ul > li" ).justText(),
				  $detailedView = this.$el.find( '.questDetails' );

			//Check if detailed view already appended
			if( $detailedView.html() ) $detailedView.slideUp( "fast", function() {
				this.remove();
			} );

			//Got the name of the quest
			//Getting the model
			if( questTitle ) {
				questModel = this.collection.findWhere( { name: questTitle } );
			}

			if( questModel ) {
				//Create a new view
				var editQuest = new TheGame.Views.EditQuestView( { model: questModel } );
				//Append newly created view to the dom
				this.$el.append( editQuest.render().el ).end().slideUp( "fast" );
			}
		},

		displayByType: function( e ) {
			var type = $( 'div#questreward input:checked' ).attr( 'id' );
			this.render( this.collection.returnByType( type ) );
		},

		performSearch: function( e ) {
			var letters = $( "#searchTask" ).val();
			this.render( this.collection.search( letters ) );
		},

	} );

})();

/*global TheGame, Marionette*/

TheGame.Views = TheGame.Views || {};

(function() {
	'use strict';

	TheGame.Views.EditQuestView = Backbone.View.extend( {

		tagName:   'div',
		className: 'questDetails row col-sm-4',

		template: _.template( $( '#questDetailsTemplate' ).html() ),

		events: {
			'click #close':      'close',
			'click #save':       'saveEdits',
			'click #commentAdd': 'postComment'

		},

		initialize: function() {
			this.listenTo( this.model, 'change', this.render );
			this.listenTo( this.model, 'destroy', this.close );
		},

		render: function() {

			this.$el.html( this.template( this.model.toJSON() ) );
			//Populate priority
			this.$el.find( 'option' )
				  .get(Number.parseInt(this.model
						.get( 'priority' )) ).selected = true;

			return this;
		},

		parse: function( response ) {
			response.id = response._id;
			return response;
		},

		close: function() {
			// Delete view
			this.remove();
		},

		saveEdits: function() {
			//Update the model
			//Get all the data
			var comment = $( '#qcomments' ).val(),
				  attributes = {};

			attributes['name'] = $( '#qnameEdit' ).val();
			attributes['description'] = $( '#qdescriptionEdit' ).val();
			attributes['priority'] = Number.parseInt( $( '#qpriorityEdit' ).val() ) || 0;

			if( comment !== "" ) {
				//Update in model
				attributes['comments'] = comment;
				attributes['isComment'] = true;
			}
			else {
				attributes['isComment'] = false;
			}
			this.updateModelData( attributes );

		},

		postComment: function() {
			this.saveEdits();
		},

		updateModelData: function( values ) {
			var that = this;
			Object.keys( values ).forEach( function( key ) {
				var value = values[key];
				// iteration code
				if( value !== '' ) that.model.set( key, value );
			} );
			this.model.save();

		}

	} );

})();

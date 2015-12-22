/**
 * Created by: leaf
 * Date: 10/10/15
 * Time: 4:33 PM
 */
var application_root = __dirname,
	  express = require( 'express' ), //Web framework
	  path = require( 'path' ), //Utilities for dealing with file paths
	  QuestModel = require( "./db.js" ).quest;


var app = express();

app.configure( function() {
//parses request body and populates request.body
	app.use( express.bodyParser() );
//checks request.body for HTTP method overrides
	app.use( express.methodOverride() );
//perform route lookup based on URL and HTTP method
	app.use( app.router );
//Where to serve static content
	app.use( express.static( path.join( application_root, 'app' ) ) );
//Show all errors in development
	app.use( express.errorHandler( { dumpExceptions: true, showStack: true } ) );
} );

// Routes
//Get a list of all quests
app.get( '/api/quests', function( request, response ) {
	return QuestModel.find( function( err, quests ) {
		if( !err ) {
			return response.send( quests );
		}
		else {
			return console.log( err );
		}
	} );
} );

//Insert a new quest
app.post( '/api/quests', function( request, response ) {
	var quest = new QuestModel( {
		name: request.body.name,
		type: request.body.type
	} );
	quest.save( function( err ) {
		if( !err ) {
			return console.log( quest.name + ' has been created' );
		}
		else {
			return console.log( err );
		}
	} );
	return response.send( quest );

} );

//Get a single quest by id
app.get( '/api/quests/:id', function( request, response ) {
	return QuestModel.findById( request.params.id, function( err, quest ) {
		if( !err ) {
			return response.send( quest );
		}
		else {
			return console.log( err );
		}
	} );
} );

//Update a quest
app.put( '/api/quests/:id', function( request, response ) {
	console.log( 'Updating quest ' + request.body.name );
	return QuestModel.findById( request.params.id, function( err, quest ) {
		quest.name = request.body.name;
		quest.description = request.body.description;
		quest.type = request.body.type;
		quest.priority = request.body.priority;
		//Correct add of comments
		if( request.body.isComment ) quest.comments.push( { body: request.body.comments } );
		quest.tags = request.body.tags;
		quest.date = request.body.date;
		quest.reward = request.body.reward;
		return quest.save( function( err ) {
			if( !err ) {
				console.log( 'quest updated' );
			}
			else {
				console.log( err );
			}
			return response.send( quest );
		} );
	} );
} );

//Delete a quest
app.delete( '/api/quests/:id', function( request, response ) {
	console.log( 'Deleting quest with id: ' + request.params.id );
	return QuestModel.findById( request.params.id, function( err, quest ) {
		return quest.remove( function( err ) {
			if( !err ) {
				console.log( 'quest removed' );
				return response.send( '' );
			}
			else {
				console.log( err );
			}
		} );
	} );
} );


//Start server
var port = 3000;
app.listen( port, function() {
	console.log( 'Express server listening on port %d in %s mode',
		  port, app.settings.env );
} );


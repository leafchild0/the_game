/**
 * Created by: leaf
 * Date: 10/10/15
 * Time: 4:33 PM
 */
mongoose = require('mongoose'); //MongoDB integration

//Connect to database "Game"
mongoose.connect( 'mongodb://localhost/game' );

//In case of any additional operations with DB
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	console.log("Connected to project database");
});

var Reward = new mongoose.Schema({
	name: String,
	description: String,
	priority: Number,
	tags: [{tag:String}],
	comments : [{comment: String, date: Date}],
	date: { type: Date, default: Date.now }

});

var Comments = new mongoose.Schema({
	body: String,
	date: {type: Date, default: Date.now}
});
//Schemas
var Quest = new mongoose.Schema({
	name: String,
	description: String,
	priority: Number,
	subtasks: [],
	tags: [{tag: String}],
	comments : [ Comments ],
	date: { type: Date, default: Date.now },
	rewards: [ Reward ]

});


//Models
var QuestModel = mongoose.model( 'Quest', Quest );

module.exports = {
	quest: QuestModel
};
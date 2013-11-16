var mongoose = require('mongoose');

var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
	id    : ObjectId,
	email     : String,
	password  : String,
	firstname  : String,
	name  : String,
	token : String,
	maxNumRequestPerHour : { 'type' : Number, 'default': 1000 },
	date: { 'type': Date, 'default': Date.now }
});

//compile schema to model                                                                             
module.exports = db['makeMeApi'].model('users', UserSchema);
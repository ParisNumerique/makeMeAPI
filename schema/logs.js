var mongoose = require('mongoose');

var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var LogSchema = new Schema({
	uid     : ObjectId,
	method  : String,
	params  : String,
	request_time : Number,
	status : String,
	date : Date
});

//Set collection
var month = new Date().getFullYear()+"-"+(new Date().getMonth()+1);
var collection = 'apiUsers_log_'+month;

//compile schema to model       
module.exports = db['makeMeApi'].model(collection, LogSchema);
/**
Beautifull test class

@class Coffee
@version 1.0
@constructor
*/
function Coffee() {
	
	/**
	* List of coffee shop
	*
	* @method all
	* @return {object} list of coffee
	*/
	this.all = function(callback) {
		var q = 'SELECT * FROM cafe ORDER BY name';
		db.coffee.exec(q, callback);
	};

}

module.exports = Coffee;
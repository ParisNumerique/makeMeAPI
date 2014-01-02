/**
Beautifull test class

@class Coffee
@version 1.1
@constructor
*/
function Coffee() {
	
	/**
	* List of coffee shop
	*
	* @method all
	* @param {Int} offset the offset
	* @param {Int} limit max element
	* @return {object} list of coffee
	*/
	this.all = function(limit,offset,callback) {
		var q = 'SELECT * FROM cafe ORDER BY name LIMIT '+offset+','+limit;
		db.coffee.exec(q, callback);
	};

}

module.exports = Coffee;
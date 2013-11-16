/* MakeMeApi UrlParser module

   Parse url to retrieve data needed to call an endpoint

@class UrlParser
@constructor
*/
var UrlParser = function() {

    require('./utils/utils.js');

    var _methodName,_className,_version;

    /**
    * Parse url and assign each segment to create the endpoint
    *
    * @method _parseEndpoint
    * @param {String} endpoint, an endpoint
    * @param {String} version, default version of the API
    * @param {Object} callback, the callback
    * @return {object}
    */
    var _parseEndpoint = function(endpoint, version, callback){

        var a_endpoint = endpoint.replace(/\/$/, "").split("/");

        if(a_endpoint.length <= 1) {

            callback({methodName : '', className : '', version : ''});
            
        } else {

            if(a_endpoint.length == 2) { a_endpoint.unshift(version); }

            _methodName = a_endpoint[2].toLowerCase();
            _className = a_endpoint[1].toLowerCase().ucfirst();
            _version = a_endpoint[0];

            var res = {methodName : _methodName, className : _className, version : _version};
            
            callback(res);
        }
    };

    var _get_methodName = function(callback) {
        return _methodName;
    };

    var _get_className = function(callback) {
        return _className;
    };

    var _get_version = function(callback) {
        return _version;
    };

    return {
        parseEndpoint : _parseEndpoint,
        get_methodName : _get_methodName,
        get_className : _get_className,
        get_version : _get_version
    };

}();

module.exports = UrlParser;
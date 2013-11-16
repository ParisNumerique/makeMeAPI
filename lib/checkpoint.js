/* MakeMeApi Checkpoint module

   Check if client make a good request :
    - have a good token
    - call an existing endpoints
    - have corect arguments


@class Checkpoint
@constructor
*/
var Checkpoint = function() {

  require('./utils/utils.js');
  var _urlParser = require('../lib/urlParser'),
      _log = require('../lib/logger');
      _users = require('../lib/users');

    /**
    * Check if token is ok
    *
    * @method _isValidToken
    * @param {String} token, the token passed in args
    * @return {object}
    */
    var _isValidToken = function(token, callback){
        var User = require('../lib/users');
            User.isTokenExists(token,function(res){
                callback(res);
            });
    };

    /**
    * Check if endoint exists
    *
    * @method _isValidEndpoint
    * @param {String} endpoint, the endpoint passed in args
    * @return {object}
    */
    var _isValidEndpoint = function(endpoint, version, callback){
        fs.exists('./models/'+endpoint.version,function(exists) {
            if(exists) {
                fs.exists('./models/'+endpoint.version+'/'+endpoint.className+'.js',function(exists) {
                    if(exists) {
                        callback({bool:true,message:""});
                    } else {
                        callback({bool:false,message:"Endpoint bad class name"});
                    }
                });
            } else {
                callback({bool:false,message:"Endpoint bad version"});
            }
        });
    };

    /**
    * Check args 
    *
    * @method _isValidArgs
    * @param {String} args, the args passed in args
    * @return {object}
    */
    var _isValidArgs = function(_class, _method, args, callback){


        var introspect = require('introspect');

        /* Get parameters by introspection */
        var a_methodArgs = introspect(_class[_method]);

        /* 
         * Delete "callback" parameters wich is present by default
         * in each method
        */
        a_methodArgs = _.reject(a_methodArgs, function(val) {
            return (val === 'callback');
        });

        var res = {bool:true,a_methodArgs:a_methodArgs};

        /* Too much parameters ! */
        hasMoreParams = _.difference(args,a_methodArgs);
        if(hasMoreParams.length > 0) {
            res = {bool:false,message:'Non valid parameter(s) : '+hasMoreParams.join(", ")};
        }

        /* Not enough parameters ! */
        var hasAllParams = _.difference(a_methodArgs,args);
        if(hasAllParams.length !== 0) {
            res = {bool:false,message:'Missing parameters : '+hasAllParams.join(", ")};
        }

        callback(res);

    };

    /**
    * Check if number of requests is not exceeded
    *
    * @method _isNbRequestExceeded
    * @param {Object} uid, the user id
    * @param {Object} token, the user token
    * @return {object}
    */
    var _isNbRequestExceeded = function(uid, token, callback){
    
        //--Get user last hour num requests
        _log.numRequestByHours(uid, function(counter) {
            var currentRequest = counter;
            //--Get user max hour num requests
            _users.maxNumRequests(token,function(maxNum) {
                if(counter > maxNum ) {
                    callback(true);
                } else {
                    callback(false);
                }
            });

        });
    };


    return {
        isValidToken : _isValidToken,
        isValidEndpoint : _isValidEndpoint,
        isValidArgs : _isValidArgs,
        isNbRequestExceeded : _isNbRequestExceeded
    };

}();

module.exports = Checkpoint;
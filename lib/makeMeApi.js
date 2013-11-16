/* MakeMeApi MakeApiMe module

    Execute fonction
    @class MakeMeApi
    @constructor
*/
var MakeMeApi = function() {

    require('./utils/utils.js');
  
    var _urlParser = require('../lib/urlParser'),
        _checkpoint = require('../lib/checkpoint'),
        _user = require('../lib/users'),
        _Class,_Method,_Endpoint,_Emitter,_Uid;

    if(_config[_environment].app.memcached_host) {
        var memcached = require('memcached'),
            _Memcached = new memcached(_config[_environment].app.memcached_host+':'+_config[_environment].app.memcached_port,{timeout:_config[_environment].app.memcached_timeout});
    }
    

    /**
    * Authentificate user
    *
    * @method _auth
    * @param {string} token, user token provided
    * @param {object} callback
    * @return {object}
    */
    var _auth = function(token,callback) {
        debug('Is Valid Token ? ','green');
        _checkpoint.isValidToken(token, function(isValid) {
            if(isValid) {
                debug('\t Yes','green');
                debug('Get uid from token','green');
                _user.get_uid(token, function(uid) {
                    if(uid) {
                        debug('\tuid found : '+uid,'green');
                        debug('Is number of requests exceeded ?','green');
                        _Uid = uid;
                        _checkpoint.isNbRequestExceeded(uid, token, function(res) {
                            if(!res) {
                                debug('\tNo, that\'s good ;-)','green');
                                callback({'status':'success',data:{token:token,uid:uid},message:null});
                            } else {
                                debug('\tYes :-/','red');
                                callback({'status':'error','data':null,'message':'Queries quota exceeded !'});
                            }
                        });
                    } else {
                        debug('\tuid not found !','red');
                        callback({'status':'error','data':null,'message':'uid not found !'});
                    }
                });
            } else {
                debug('\t No','red');
                callback({'status':'error',data:null,message:'Oopss...Wrong token'});
            }
        });
    };

    /**
    * Instantiate class from endpoint
    *
    * @method _instantiate
    * @param {String} endpoint, the endpoint
    * @param {int} version, default version of the API
    * @return {object} instatiated Class, ready to use...
    */
    var _instantiate = function(endpoint,version,callback){

        debug('Call _instantiate method','green');
        _urlParser.parseEndpoint(endpoint,version,function(splitEndpoint) {
            debug('Endpoint parsed','green');

            debug('\tIs Valid endpoint ?','green');
            _checkpoint.isValidEndpoint(splitEndpoint, version, function(isValid) {
                if(isValid.bool) {
                    debug('\tYes ('+endpoint+')','green');

                    /* Load model */
                    Class = require('../models/'+splitEndpoint.version+'/'+splitEndpoint.className+'.js');

                    /* Create object from endpoint */
                    _Class = new Class();

                    /* Save Endpoint */
                    _Endpoint = endpoint;

                    callback({'status':'success','data':_Class,'message':''});
                } else {
                    debug('\tNo','red');
                    callback({'status':'error','data':false,'message':isValid.message});
                }
            });

        });

    };

    /**
    * Execute API request
    *
    * @method _execute
    * @param {object} args, user argument (from req.query)
    * @return {object}
    */
    var _execute = function(args, eventEmitter) {

        debug('Call _execute method','green');
        
        var that = this;
        var query = that.clean_query(args);
        
        that.auth(args.token,function(auth_results) {
            _Emitter = eventEmitter;

            if(auth_results.status == 'success') {

                if(_config[_environment].app.memcached_host) {
                    _Memcached_key = _Endpoint;
                    _Memcached_key+= query;

                    debug('Create memcached key : '+_Memcached_key,'yellow');

                } else {

                    debug('Memcached is disable','yellow');

                }

                /* Check if all required params are ok */
                debug('Is number of args is valid ?','green');


                _checkpoint.isValidArgs(_Class, that.method(), query, function(query) {

                    if(query.bool) {

                        debug('\tYes','green');

                        /* 
                         * Get values from user query
                        */
                        var a_queryValue = [];
                        _.each(query.a_methodArgs, function(val) {
                            a_queryValue.push(args[val]);
                        });

                        /*
                         * Add callback at last parameters
                        */
                        a_queryValue.push(that.display);
                        _Class[that.method()].apply(that, a_queryValue);

                    } else {
                        debug('\tNo','red');
                        _Emitter.emit('dataReceived',{'status':'error','data':null,'message':query.message});
                    }

                });

            } else {
                _Emitter.emit('dataReceived',auth_results);
            }
        });

    };

    /**
    * Emit data when received
    *
    * @method _display
    * @param {object} err, err from datasources
    * @param {object} data, datas retreived from query
    * @return void
    */
    var _display = function(err, data) {
        if (err) {
             _Emitter.emit('dataReceived', {'status':'error','data':null,'message':err});
         } else {
            /* Cache datas  */
            if(_config[_environment].app.memcached_host) {
                _Memcached.set(_Memcached_key, data, _config[_environment].app.memcached_lifetime, function( err, result ){
                    if( err ) debug('Memcached SET error :'+err,'red');
                    _Emitter.emit('dataReceived', {'status':'success','data':data,'message':null});
                });
            } else {
                _Emitter.emit('dataReceived', {'status':'success','data':data,'message':null});
            }
         }
    };


    /**
    * Get user query and clean it
    *
    * @method _clean_query
    * @param {object} args, user argument (from req.query)
    * @return {object}
    */
    var _clean_query = function(args, callback) {

        /* 
         * Delete "token" args
        */
        var a_queryArgsKey = _.keys(args);
        var a_queryArgs = _.reject(a_queryArgsKey, function(val) {
            return (val === 'token');
        });

        return a_queryArgs;

    };

    var _version = function(endpoint,version,callback) {
        _urlParser.parseEndpoint(endpoint,version,function(splitEndpoint) {
            callback(splitEndpoint.version);
        });
    };

    var _class = function() {
        return _Class;
    };

    var _method = function() {
        return _urlParser.get_methodName();
    };

    var _uid = function() {
        return _Uid;
    };

    return {
        auth : _auth,
        uid : _uid,
        instantiate : _instantiate,
        class : _class,
        method : _method,
        version : _version,
        clean_query :  _clean_query,
        execute :  _execute,
        display :  _display,
        memcached : _Memcached
    };

}();

module.exports = MakeMeApi;
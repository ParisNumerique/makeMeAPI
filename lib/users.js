/* 
MakeMeApi Users module

@class Users
@constructor
*/
var User = function(){

    require('./utils/utils.js');
    _user = require("../schema/users");
    _enc = require('enc');
    _secret_key = 'AE8864B8626CBC5801BB779042F7F4FE';

    /**
    * Log user
    *
    * @method _login
    * @param {String} email the user email
    * @param {String} password the user password
    * @return {object} 
    */
    var _login = function(email, password, callback) {
        var crypted_password = _enc.aes_128_cbc.encode(password, _secret_key);
        _user.findOne({email: email, password: crypted_password}, function(err, user) {
            if (err) throw err;
            if(!user) {
                callback({'status':'error',data:null,message:'Wrong credentials'});
            } else {
                callback({'status':'success',data:user,message:null});
            }
        });
    };

    /**
    * Register User
    *
    * @method _register
    * @param {email} the user email
    * @param {password} the user password
    * @return {object} 
    */
    var _register = function(email, password, firstname, name, callback){

        _isAccountExist(email,function(res) {
            if(!res) {
                var crypted_password = _enc.aes_128_cbc.encode(password, _secret_key);
                var user = _user({ email: email, password: crypted_password, name: name, firstname: firstname });
                    user.save(function (err) {
                      if (err) throw err;
                      callback(user);
                    });
            } else {
                callback({'status':'error',data:null,message:'User account already exists'});
            }
        });

    };

    /**
    * Check if account exsits or not
    *
    * @method _isAccountExist
    * @param {email} the user email
    * @return {object} 
    */
    var _isAccountExist = function(email,callback){
        _user.findOne({email:email}, function(err, user){
            if (err) throw err;
            var res = (!user) ? false : true;
            callback(res);
        });
   };

   /**
    * Check if token exists or not
    *
    * @method _isTokenExists
    * @param {email} the user email
    * @return {object} 
    */
    var _isTokenExists = function(token,callback){
        _user.findOne({token:token}, function(err, token){
            if (err) throw err;
            var res = (!token) ? false : true;
            callback(res);
        });
   };


    /**
    * Set a token for a User
    *
    * @method _setToken
    * @param {email} the user email
    * @return {object} 
    */
    var _setToken = function(email,callback){

        var token;

        require('crypto').randomBytes(32, function(ex, buf) {
            token = buf.toString('hex');

            var conditions = { email: email},
            update = { token: token },
            options = { multi: false };

            _user.update(conditions, update, options, function(err,res) {
                if (err) throw err;
                callback(res,token);
            });
        });

    };


    /**
    * Remove User
    *
    * @method _register
    * @param {email} the user email
    * @param {password} the user password
    * @return {object} 
    */
    var _remove = function(email, callback){

        _user.remove({ email: email }, function(err) {
           if (err) throw err;
           callback(true);
        });

    };


    /**
    * Get user id by token
    *
    * @method _get_uid
    * @param {String}, token, the user token
    * @return {object} 
    */
    var _get_uid = function(token, callback){
        _user.findOne({token:token}, function(err, user){
            if (err) throw err;
            if(user !== null) {
                callback(user._id);
            } else {
                callback(null);
            }
        });

    };

    /**
    * Get the max number of request allowed by hours
    *
    * @method _maxNumRequests
    * @param {String}, token, the user token
    * @return {object} 
    */
    var _maxNumRequests = function(token, callback){
        _user.findOne({token:token}, function(err, user){
           if (err) throw err;
           callback(user.maxNumRequestPerHour);
        });

    };

    return {
        login    : _login,
        register : _register,
        remove : _remove,
        setToken : _setToken,
        isTokenExists : _isTokenExists,
        isAccountExist : _isAccountExist,
        maxNumRequests : _maxNumRequests,
        get_uid : _get_uid
    };
}();

module.exports = User;
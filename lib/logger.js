/* 
MakeMeApi Logger module

@class Logger
@constructor
*/
var Logger = function() {

  require('./utils/utils.js');
  _log = require("../schema/logs");

  /**
  * Log request to the API
  *
  * @method _add
  * @param {Int} uid API client id
  * @param {String} className the class name calling
  * @param {String} methodName the method name calling
  * @param {String} args the args calling
  * @param {Date} elapsed_time the execution time
  * @return {object} 
  */
  var _add = function(uid, methodName, args, elapsed_time, status, callback){
    var Log = _log({uid: uid,
                    method: methodName,
                    params: args,
                    request_time: elapsed_time,
                    status: status,
                    date: new Date()
              });

        Log.save(function (err,row) {
          if (err) throw err;
          callback(true);
        });

    };

    /**
    * Get num request by hours for a given client
    *
    * @method _numRequestByHours
    * @param {Int} uid API client id
    */
    var _numRequestByHours = function(uid, callback) {

      var moment = require('moment'),
          start = moment().format(),
          end = moment().add('h', 1).format();

      _log.count({ uid: uid, date: {$gt: start, $lte: end} }, function (err, count) {
        if (err) throw err;
        callback(count);
      });
    };

    return {
        add : _add,
        numRequestByHours : _numRequestByHours
    };

}();

module.exports = Logger;
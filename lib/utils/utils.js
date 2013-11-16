var appStart = process.hrtime();

check = require('validator').check;
sanitize = require('validator').sanitize;
Validator = require('validator').Validator;
_ = require('underscore');
querystring = require('querystring');
color = require("./ansi-color").set;

elapsed_time = function(){
    var precision = 5; // 3 decimal places
    var elapsed = process.hrtime(appStart)[1] / 1000000000; // divide by a million to get nano to milli
    appStart = process.hrtime(); // reset the timer
    return elapsed.toFixed(precision); // print message + time
};

debug = function(str,theColor) {
    if(_config.debug) {
        var prefix,theStr;
            prefix = color('API - ','cyan+bold');
            theStr = color(str,theColor);
        //--
        console.log(prefix+theStr);
    }
};

strip_query_creditential = function(query) {
	/* 
     * Suppression des arguments "api_id" et "secret_key"
     * passés dans l'url.
    */
    var a_queryArgsKey = _.keys(query);
    var a_queryArgs = _.reject(a_queryArgsKey, function(val) {
        return (val === 'api_id' || val === 'secret_key');
    });

    /* 
     * Récupération des valeurs passées en paramètres sans les creditential
    */
    var a_queryValue = [];
    _.each(a_queryArgs, function(val) {
        a_queryValue[val] = query[val];
    });

    return querystring.stringify(a_queryValue);
};

String.prototype.ucfirst = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

Validator.prototype.error = function (msg) {
    this._errors.push(JSON.parse(msg));
    return this;
};

Validator.prototype.getErrors = function () {
    return this._errors;
};
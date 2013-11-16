/* 
    Create connection to data sources.
    Data sources could be datas strored in database (mysql / mongo / extended for whatever you want) or files
    Each data sources are stored in the db vars.
 */

var mysql = require('mysql'),
    mongoose = require('mongoose');
    fs = require('fs'),
    _ = require('underscore'),
    db = {};
    
function connect(datasources) {
    

    _.each(datasources,function(options,source_type) {
        switch(source_type) {
            case 'mongo':
                _.each(options,function(option,name) {
                    var opts = { user: option.user, pass: option.password};
                    db[name] = mongoose.createConnection(option.host, option.database, option.port, opts);
                    db[name].on('open', function() {
                        debug('DATASOURCES : Connected on mongo db '+name,'green');
                    });
                    db[name].on('error', console.error.bind(console, 'connection error:'));
                });
                break;
            case 'mysql':

                _.each(options,function(option,name) {
                    db[name] = new mysql.createConnection(option);
                    
                    db[name].connect(function(err) {
                        if (err) {
                            console.log(err);
                            console.log(option);
                        }
                        debug('DATASOURCES : Connected on mysql db '+name,'green');
                    });

                    db[name].on('error', function(err) {
                        console.log('db error', err);
                        if(err.code === 'PROTOCOL_CONNECTION_LOST') {
                            console.log("Mysql datasources is now disconnected");
                            //handleDisconnect();
                        } else {
                            throw err;
                        }
                    });

                    db[name].exec = function(query, values, callback) {
                        
                        if(typeof values === 'function' && callback === undefined) {
                            callback = values;
                            values = [];
                        }
                       
                        return db[name].query(query, values, callback);
                    };

                });
                break;
            case 'file':
                //--TODO
                break;
            default :
                debug(source_type+' is not defined as data connector, please impove it in conf.js','red');
        }
    });

    return db;
};

exports.connect = connect;
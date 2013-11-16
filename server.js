/**
 * Module dependencies.
 */

require('./lib/utils/utils.js');
require('./init.js');

var express = require('express'),
	http = require('http'),
    https = require('https'),
    fs = require('fs'),
    querystring = require('querystring'),
	introspect = require('introspect'),
    moment = require('moment'),
    logger = require('./lib/logger'),
    doc = require('./lib/doc');

var app = express();
    app.set('port', process.env.PORT || 3000);
    app.use(express.favicon(__dirname + '/public/images/favicon.png'));
    app.use(express.bodyParser());


var events = require('events'),
    dataReceived = new events.EventEmitter();

var Class, Method, ClassName;
var defaultVersion = '2.0';

/*
 * Header management (for COS)
*/
app.configure(function(){
    app.use(function(req, res, next) {
        res.setHeader("Access-Control-Allow-Origin", "http://makemeapi.lestudio.lc");
        res.setHeader("Access-Control-Allow-Credentials", true);
        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, X-Requested-With");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST","PUT", "OPTIONS");
    
        // intercept OPTIONS method
        if ('OPTIONS' == req.method) {
          res.send(200);
        }
        else {
          return next();
        }

    });
});

/*
 * Main Route : execute the API call based on the url
*/
//curl -d "email=xac@xac-zone.com&pwd=aBox0quip" http://makemeapi.lestudio.lc:3000/data/
//curl -d "token=f9e0f9e8b389de051a4ff350d0a43eeb&created=1371992730&lat=48.856332&lon=2.353453&radius=500&offset=0&limit=10" http://makemeapi.lestudio.lc:3000/data/1.1/QueFaire/get_geo_activities/
app.all('/data/*', function(req,res) {
    
    var MakeMeApi = require('./lib/makeMeApi'),
        endpoint = req.params[0],
        args = _.extend(req.body,req.query),
        uid = '',
        version = defaultVersion,
        noTokenArgs = MakeMeApi.clean_query(args);
        

        if(_config[_environment].app.memcached_host) {
            var memcached_key = endpoint;
                memcached_key+= noTokenArgs;

                MakeMeApi.memcached.get(memcached_key, function( err, data ){ //memcached_key
                    if( err ) debug('Memcached GET error :'+err,'red');
                    if(!data) {

                        MakeMeApi.instantiate(endpoint, version, function(results) {
                           
                            if(results.status === 'success') {
                                /* Execute query */
                                MakeMeApi.execute(args,dataReceived);
                            } else {
                                res.send({'status':'error','data':null,'message':results.message});
                            }

                        });
                        
                    } else {

                        debug('memcached data exists for key "'+memcached_key+'"','yellow');
                        MakeMeApi.auth(args.token,function(isAuth) {
                            if(isAuth.status === 'success') {
                                debug('\tUsers is ok','green');
                               
                                /* Send data to user */
                                dataReceived.emit('dataReceived', {'status':'success','data':data,'message':null});

                            } else {
                                debug('\tUser authentification failed','red');
                                res.send(isAuth);
                            }
                        });

                    }
                });
        } else {

            MakeMeApi.instantiate(endpoint, version, function(results) {

                if(results.status === 'success') {
                    /* Execute query */
                    MakeMeApi.execute(args,dataReceived);
                } else {
                    res.send({'status':'error','data':null,'message':results.message});
                }

            });
        }
        
        /* Add a one time listener for the event. 
         * This listener is invoked only the next time the event is fired, after which it is removed.
        */
        dataReceived.once('dataReceived',function(results) {

            uid = (uid === '') ? MakeMeApi.uid() : uid;

            if(results.status === 'error') {
                
                logger.add(uid,endpoint,noTokenArgs,elapsed_time(),results.status, function(res) {
                    debug('...by the way, log request is ok ;-)','cyan');
                });

                res.send(results);

                debug('API call ending, good job !','cyan+bold');

            } else {

                MakeMeApi.version(endpoint,defaultVersion,function(version) {
                    
                    version = version;
                    
                    logger.add(uid,endpoint,noTokenArgs,elapsed_time(),results.status, function(res) {
                        debug('...by the way, log request is ok ;-)','cyan');
                    });

                    results.requestTime = elapsed_time();
                    results.version = version;

                    res.send(results);

                    debug('API call ending, good job !','cyan+bold');
                    
                });

            }

        });
    
});


/*
 * Register a user
*/
app.all('/register',function(req,res) {
        
        var Users = require('./lib/users');
        
        var email = sanitize(req.body.email).xss();
        var password = sanitize(req.body.password).xss();
        var password_confirm = sanitize(req.body.password_confirm).xss();
        
        var firstname = sanitize(req.body.firstname).xss();
        var name = sanitize(req.body.name).xss();
            
        /* Form validation */
        var validator = new Validator();
            validator.check(email,'{"field":"email","str_error":"ERR_EMAIL"}').isEmail();
            validator.check(password,'{"field":"password","str_error":"ERR_PASSWORD_LEN"}').len(8);
            validator.check(password_confirm,'{"field":"password_confirm","str_error":"ERR_PASSWORD_CONFIRM"}').equals(password);
            validator.check(name,'{"field":"name","str_error":"ERR_NAME"}').notNull();
            validator.check(firstname,'{"field":"firstname","str_error":"ERR_FIRSTNAME"}').notNull();

        var errors = validator.getErrors();

        /* Check for errrors...*/
        if(errors.length > 0) {
            res.send({'status':'error',data:null,message:errors});
        } else {

            /* Process registration...*/
            Users.register(email,password,firstname,name,function(results) {
                if(results.status != 'error') {
                    //--Set token for new user
                    Users.setToken(email,function(isOk,token) {
                        if(isOk) {
                            //--Get some datas about the new user
                            var user = {};
                                user.id = results.uid;
                                user.email = results.email;
                                user.token = token;
                            res.send({'status':'success',data:user,message:null});
                        } else {
                            res.send({'status':'error',data:null,message:'Could\'nt create token.'});
                        }
                    });
                } else {
                    res.send({'status':'error',data:null,message:[{"field":"email","str_error":"User email already exists"}]});
                }
            });
        }
    
});

/*
 * Display DOC in JSON format.
*/
app.all('/doc',function(req,res) {
    doc.get(function(doc) {
        res.send({'status':'success',data:doc,message:null});
    });
});

/*
 * Welcome Home Route.
*/
app.all('/', function(req, res) {
    res.send({'status':'succes','data':null,'message':'Welcome to the Mairie de Paris node api-engine'});
});


/*
 * Prevent crash server
 * log the error
 * display an 500 error to the client.
*/
app.use(function(err, req, res, next){
    console.log(err.stack);
    res.send(500, {'status':'error','data':null,'message':'500 - uncaughtException'});
});


/* Start Server in SSL mode or not */
if(_config[_environment].app.ssl_key) {
    var options = {
        key: fs.readFileSync(_config[_environment].app.ssl_key),
        cert: fs.readFileSync(_config[_environment].app.ssl_crt)
    };

    var server = https.createServer(options, app).listen(app.get('port'), function(){
        console.log('MakeMeAPi server listening on port ' + app.get('port') + ' with SSL enable');
        console.log('Debug is set to '+_config.debug);
        doc.docWatcher();
    });
} else {
    var server = http.createServer(app).listen(app.get('port'), function(){
        console.log('MakeMeAPi server listening on port ' + app.get('port'));
        console.log('Debug is set to '+_config.debug);
        doc.docWatcher();
    });
}
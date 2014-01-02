var	datasources = require('./lib/datasources');

/*
	Load config file using fs.readFileSync (blocking function) as we need to be sure 
	that application options are properly loaded before start it.
*/
var appConf = './config.json';
var fs = require('fs');

if(!fs.existsSync(appConf)) {
	console.log('File '+appConf+' doesn\'t exists in '+process.cwd()+')');
	process.exit(1);
}

_config = JSON.parse(fs.readFileSync(appConf));
_environment = _config.environment;

// Setup datasources describe in config file.
exports.db = datasources.connect(_config[_environment].datasources);
MakeMeAPI
========

A Fast and powerfull data agnostic API maker to better expose your datas via HTTP / HTTPS. 

Also monitore APIs consumption.


Install
-------
Make sure you have nodejs [node.js](http://nodejs.org) and [mongodb](http://mongodb.org) correctely set up. 

You can also optionally install [memcached](http://memcached.org/) 

Then install makeMeAPI dependencies with :

	$ npm install
    

Config
------

Open `config.json` on the root of the projet and edit it as you need.

* `environment`: The environment of the application. Can be "development", "production" or whatever you want.
* `debug`: true or false. If true, turning the application in "verbose" mode wich will display in terminal several logs informations.
* `[environment]`: json key corresponding to an environment name declared above.
	* `docPath` : path where the documentation file will be generated. Be sure that this folder is writable. Default is "./docs"
	* `ssl_key` / `ssl_crt` : path to you SSL key and certificate files if you want enable HTTPS. Leave this path empty if you just want HTTP.
	* `cors` : set domain name for Cross-Origin Requests access.
	* `create_user_allowed_ip` : set the IPs that are authorised to call /register route for create user account.
	* `memcached_*` : memcached configuration. Leave memcached_host empty if you don't want use memcached.
	* `datasources` : all your datasources connection, can be "mysql", "mongo" or "file"
	* `mysql`:
		* `[connectionName_1]`: the mysql connection name. This connection will be used in your functions each time you need it. You can use as many dababases you want by copy and past this json node.
			* `user` : database user
			* `password` : database password
			* `database` : database name
			* `host` : database host
			* `port` : database port. (Default 3306)
			* `debug` : true / false. Enable mysql debug mode.
			* `socketPath` : if you plan connect to  your MySQL database through socket, set this variable with the path of the socket.
	* `mongo`:
		* `[connectionName_1]`: the mongo connection name. This connection will be used in your functions each time you need it. You can use as many databases you want by copy and past this json node. 
			* `user` : database user
			* `password` : database password
			* `database` : database name
			* `host` : database host
			* `port` : database port. (Default 27017)
	* `file`:
		* `[fileNameConnection_1]`: the file connection name. This will create a connection to a file (can be CSV, json, or whatever you want)
			* `path` : path to you data file
			* `encoding` : encoding of the file
			
**WARNING : for the moment, the mongoDB connection requires at least one connection to be named "makeMeApi" in order to store users account and users API consumption.**
  

Start server
------------

To start the server, simply execute this command in your terminal

	$ nodemon server.js
	
Note : you can also start the server with [forever](https://github.com/nodejitsu/forever). This packet is installed by default if you use the `$ npm install` command as describe before.



Resquesting the API
-------------------

First you have to create an account (be sure to declare first your IP in config.js under the "create_user_allowed_ip" key): 

	$ curl -d "email=myemail@makemeapi.com&password=mystrongpassword&name=doe&firstname=john" http://localhost:3000/register

Response will return a json object with a token. 

Note that the user is now created and stored in the mongodb MakeMeApi database under "users" collection.


Sample
------

* Install the MySQL datas (`./sample/cafe_un_euro.sql`)
* Update the config.js file. Under the "development / datasources / mysql" key, set your MySQL database settings.
* Copy the whole folders from sample/ and paste it into models/ directory.
* Start the server (`$ node server.js`).
* Call the endpoint : 
	
	* for v1.0 model (without parameters)::
	
		`$ curl -d "token=[token]" http://localhost:3000/data/1.0/coffee/all`

	* for v1.1 model (with parameters):
	
		`$ curl -d "token=[token]&offset=0&limit=1" http://localhost:3000/data/1.0/coffee/all`

* Good to know
	* in each subfolder you can see a `coffee.js` file. This file contains your database queries. 
	* each time you update or add a file under the models folder, Yuidoc will parse it, extract your comment and put it in a json file under the docPath you define in the `config.json`. More information about block comments are avaibable [here](http://yui.github.io/yuidoc/).
	* you can access to the documentation via `$ curl http://localhost:3000/doc` (cli formatted) or `$ curl http://localhost:3000/rawdoc` (json formatted).


### Class sample

```js
	
	/**
	OneEuroCoffee class
	
	@class Coffee
	@version 1.0
	@constructor
	*/
	function Coffee() {
		
		/**
		* List of coffee shop
		*
		* @method all
		* @return {object} list of coffee shops
		*/
		this.all = function(callback) {
			var q = 'SELECT * FROM cafe ORDER BY name';
			db.coffee.exec(q, callback);
		};
	
	}

	module.exports = Coffee;
	
```


Running unit tests
------------------

To Be Continued



Extra
-----

If you plan to use MakeApi on an Mac environnement, we suggest to use two nicely free software :

* [Robomongo](http://robomongo.org/) : a MongoDB GUI 
* [Sequel Pro](http://www.sequelpro.com) : a MySQL GUI  




Credits
-------

![Maire de Paris](https://filer.paris.fr/logo-mairie-paris.png)

Got questions? Need help? Tweet at [@MakeMeAPI](http://twitter.com/MakeMeAPI).

MakeMeAPI is maintained and funded by [Mairie de Paris](http://www.paris.fr)

The names and logos for thoughtbot are trademarks of Gnuside, inc.


License
-------
This project is under BSD-3 licence for more details read LICENCES.TXT


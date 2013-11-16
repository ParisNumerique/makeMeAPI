# MakeMeApi #
---

A Fast and powerfull data agnostic API maker to better expose your datas via HTTP / HTTPS. 

Also monitore APIs consumption.


## Install (OS X)##
---

First install [node.js](http://nodejs.org) and [mongodb](http://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/). You can also optionally install [memcached](http://memcached.org/) Then:

	$ npm install
    
## Config ##
---
Open config.json on the root of the projet and edit it as you need.

* `environment`: The environment of the application, can be "developpemnt", " "production" or whatever you want.
* `debug`: true or false. If true, turning the application in "verbose" mode wich will display in terminal several log informations.
* `[environment]`: json key corresponding to an environment name declare above
	* `docPath` : path where the documentation file will be generated. Be sure that this folder is writable. Default is "./docs"
	* `ssl_key` / `ssl_crt` : path to you SSL key and certificate files if you want enable HTTPS. Leave this path empty if you just want HTTP.
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
		* `[connectionName_1]`: the mongo connection name. This connection will be used in your functions each time you need it. You can use as many dababases you want by copy and past this json node. Note that at least the "makeMeApi" mongodb connection have to be set in order to store users account and users API consumption.
			* `user` : database user
			* `password` : database password
			* `database` : database name
			* `host` : database host
			* `port` : database port. (Default 27017)
	* `file`:
		* `[fileNameConnection_1]`: the file connection name. This will create a connection to a file (can be CSV, json, or whatever you want)
			* `path` : path to you data file
			* `encoding` : encoding of the file
  

## Start server ##
---
To start the server, simply execute this command in your terminal

	$ node server.js
	
Note : you can also start the server by using [nodemon](https://github.com/remy/nodemon)  or [forever](https://github.com/nodejitsu/forever). This two packets are installed by default if you use the `$ npm install` command as describe before.


## Usage ##
---

With MakeMeApi you just have one thing to do and to focus on : your models. 

* Go to models/ repository and create a subfolder corresponding to the version of your API. ie . "models/1.0/"
* Under this folder create a .js file and name it as you want. 
* Create a class and create all your methods you need. 
	* These methods have to do only one things : get / save data from a connection database declared in config.json.
	* All methods needs at least the "callback" parameters (see the example). 
* Each time you upload a models file under the models folder, yuidoc will parse it and extract you comment and put it in a json file under the docPath you define in the config.json. More information about interpreted comments are avaibable [here](http://yui.github.io/yuidoc/).


### Class sample

```js
	
	/**
	BookStore Sample class : expose BookingStore mysql database datas.
	
	@class BookStore
	@version 1.0
	@constructor
	*/
	function BookStore() {

		/**
		* Get some data from book store
		*
		* @method get_categories
		* @return {object} le nom et l'identifiant de la catégorie.
		*/
		this.get = function(callback) {
			var q = 'SELECT idcategories,name FROM categories ORDER BY name';
			db.PN.exec(q, callback);
		};
	
	}
```
### Let's rock now : resquest the API
---

First you have to create an account : 

	$ curl -d "email=email&example.com&pwd=mystrongpassword" http://your_domain:3000/register

Response to the request will return a json object with a token. 

Note that the user is now created and stored in the mongodb MakeMeApi database under "users" collection.

Now, just let the enchantment operate, open a browser and call [you_domain]:3001/data/[className]/[methodName]/?token=[yourtoken]&param1=&params2=....or open a terminal and execute `$ curl -d "token=[token]&lat=48.856332&lon=2.353453&radius=500&offset=0&limit=10" http://makemeapi.lestudio.lc:3000/data/1.0/QueFaire/get_geo_activities/`

You can also see the generated doc by calling http://your_domain:3000/doc


## Running unit tests
---
TODO


## Extra
---
If you plan to use MakeApi on an Mac environnement, we suggest to use two nicely free software :

* [Robomongo](http://robomongo.org/) : a MongoDB GUI 
* [Sequel Pro](http://www.sequelpro.com) : a MySQL GUI  


## License
---
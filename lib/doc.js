/* MakeMeApi Doc module

   Wactch for models evolution and update doc if needed.

@class Doc
@constructor
*/
var Doc = function() {

    require('./utils/utils.js');
  
    /**
    * Génération de la documentaion à chaque changement 
    * des fichiers .js présents dan le dossier "../models"
    * @method _docWatcher
    * @param -
    * @return void
    */
    var _docWatcher = function(){

        debug("DocWatcher launching...","green");

        /*
         * Watch 'models' folders to auto generate documentation
        */
        var filter = function(pattern, fn) {
            return function(filename) {
                if (pattern.test(filename)) {
                    fn(filename);
                }
            };
        };

        /* wrapper fs.watch */
        var watch = require('node-watch');
        watch('./models', { recursive: true, followSymLinks: false }, filter(/\.js$/, function(filename) {
            var path = require('path');

            var options = {
                paths: [path.dirname(filename)],
                outdir: _config[_environment].app.docPath+path.dirname(filename)+'/doc'
            };

            var Y = require('yuidocjs');

            if(!fs.existsSync(options.outdir)) {
                var makedir = require('makedir');
                makedir.makedir(options.outdir,function(err,p) {
                    if(err === null) {
                        debug('New Doc path created '+p,'yellow');
                        new Y.YUIDoc(options).run();
                    } else {
                        debug('Unable to create path '+p,'red');
                    }
                });
            } else {
                new Y.YUIDoc(options).run();
            }


        }));

        debug("\tDocWatcher enable","green");
    };

     /**
    * Get doc and parse
    * @method _get
    * @param -
    * @return object
    */
    var _get = function(callback) {
        var Finder = require('fs-finder');
        var path = _config[_environment].app.docPath;
        var files = Finder.from(path).findFiles('data.json');
        var oDoc = {'apiDoc':[]};
        var aDoc = [];
        var out_doc = [];
            
        _.each(files,function(file,index) {
            var documentations = JSON.parse(fs.readFileSync(file,'utf8'));
            _.each(documentations.classes,function(classDocumentation,className) {
                var version = classDocumentation.version;
                _.each(documentations.classitems,function(methodDocumentation) {
                    oDoc.apiDoc.push({
                                        class:methodDocumentation.class,
                                        method:{
                                            name:methodDocumentation.name,
                                            version:version,
                                            description:methodDocumentation.description,
                                            return:methodDocumentation.return,
                                            params:(methodDocumentation.params) ? methodDocumentation.params : ''
                                        }
                                    });
                });
            });
        });

        callback(oDoc);

    };

    return {
        docWatcher : _docWatcher,
        get : _get
    };

}();

module.exports = Doc;
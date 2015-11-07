
module.exports = function(dbdriver,srvport){
    
        var express             = require('express');
        var bodyParser          = require('body-parser');
        this.ctrlIndex          = require("./controllers/index.js");
        this.ctrlLogin          = require("./controllers/login.js");
        this.ctrlRecipes        = require("./controllers/recipes.js");
        var Waterline           = require('waterline');
        var expressValidator    = require('express-validator');
        var waterlineConfig     = require('./config/waterline_config');
        var session             = require('express-session');
        var flash               = require('connect-flash');
        this.srv                = express();
        
        // ORM példány
        this.orm                = new Waterline();
        this.mdlUsers           = require('./models/users');
        this.mdlRecipes         = require('./models/recipes');
        
        if(  dbdriver ){
            console.log('Setting dbdriver='+dbdriver);
            waterlineConfig.connections.default.adapter = dbdriver;
        }
        
        this.orm.loadCollection(Waterline.Collection.extend(this.mdlRecipes));
        this.orm.loadCollection(Waterline.Collection.extend(this.mdlUsers));
        
        this.srv.use(bodyParser.urlencoded({ extended: false }));
        this.srv.set('views', './views');
        this.srv.set('view engine', 'hbs')
        this.srv.use(express.static('public'));
        this.srv.use(expressValidator());
        this.srv.use(session({
            cookie: { maxAge: 620000 },
            secret: 'titkos szoveg',
            resave: false,
            saveUninitialized: false,
        }));
        this.srv.use(flash());
        
        this.ctrlLogin.init(this.srv,express);
        this.ctrlRecipes.init(this.srv,express,this.ctrlLogin.ensureAuthenticated);
        this.ctrlIndex.init(this.srv,express);
        
        /*Azért hogy megjelenjenek a Szerkesztés és a Törlés gombok... a főoldalon*/
        var hbs = require('hbs');
                hbs.registerHelper('if_currentuser', function(a, opts) {
                    var b = null;
                    try{
                        
                        b = this.ctrlLogin.getUser().id;
                        
                    }catch(err){
                      //  console.log('hbs.registerHelper EXCEPTION ' + err);
                        return opts.inverse(this);
                    }
                   // console.log('Checking...' + a + ' == ' + b);
                     if(a == b) 
                        return opts.fn(this);
                    else
                        return opts.inverse(this);
                });
                
        
        var parent = this;
        
        this.start = function(done){
            
            
            // ORM indítása
            parent.orm.initialize(waterlineConfig, function(err, models) {
                
                if(err) {
                    console.log('Error initializing waterline...'+err);
                    throw err;
                }
                    
                parent.srv.models = models.collections;
                parent.srv.connections = models.connections;
                    
                // Start Server
                var port = srvport || process.env.PORT;
                console.log('Setting port='+port);
                var listener = parent.srv.listen(port, function () {
                        console.log('Server has started successfully! @ http://'+listener.address().address+':'+listener.address().port);
                        parent.srv.listener = listener;
                        if ( done )
                            done();
                    });
                    
                
                console.log("ORM has been initialized successfully!");
            });
        }
        
        this.stop = function(done){
          if ( parent.srv.listener ){
            parent.srv.listener.close(done);
            
          } 
            
        }
        
}
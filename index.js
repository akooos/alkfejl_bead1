var express      = require('express');
var bodyParser   = require('body-parser');
var ctrlIndex    = require("./controllers/index.js");
var ctrlLogin    = require("./controllers/login.js");
var ctrlRecipes  = require("./controllers/recipes.js");
var Waterline = require('waterline');
var expressValidator = require('express-validator');
var waterlineConfig = require('./config/waterline_config');
var session = require('express-session');
var flash = require('connect-flash');

var app         = express();

// ORM példány
var orm = new Waterline();
var mdlUsers = require('./models/users');
var mdlRecipes = require('./models/recipes');

orm.loadCollection(Waterline.Collection.extend(mdlRecipes));
orm.loadCollection(Waterline.Collection.extend(mdlUsers));

app.use(bodyParser.urlencoded({ extended: false }));
app.set('views', './views');
app.set('view engine', 'hbs')
app.use(express.static('public'));
app.use(expressValidator());
app.use(session({
    cookie: { maxAge: 60000 },
    secret: 'titkos szoveg',
    resave: false,
    saveUninitialized: false,
}));
app.use(flash());

app.use('/recipes',ctrlLogin.ensureAuthenticated);

ctrlLogin.init(app,express);
ctrlRecipes.init(app,express);
ctrlIndex.init(app,express);



// ORM indítása
orm.initialize(waterlineConfig, function(err, models) {
    if(err) throw err;
    
    app.models = models.collections;
    app.connections = models.connections;
    
    // Start Server
    var port = process.env.PORT || 3000;
    app.listen(port, function () {
        console.log('Server is started.');
    });
    
    console.log("ORM is started.");
});

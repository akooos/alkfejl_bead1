function LoginController(){

        var passport = require('passport');
        
        this.ensureAuthenticated = function (req, res, next) {
            if (req.isAuthenticated()) 
            { 
                return next(); 
            }
            console.log("ensureAuthenticated::Redirect to login");
            //return next(); 
            res.redirect('/login/signin');
        };

        function setLocalsForLayout (req, res, next) {
            
                res.locals.loggedIn = req.isAuthenticated();
                res.locals.user = req.user;
                next();
        };
        function initRoutes(router){
       
            var rndSignin = function (req, res) {
                console.log('LoginController: Rendering signin');
                res.render('login/signin');
            }
            router.get('/', rndSignin );
            router.get('/signin', rndSignin );
            router.get('/signup', function (req, res) {
                console.log('LoginController: Rendering signup');
                res.render('login/signup');
            });
            router.get('/edit', function (req, res) {
                console.log('LoginController: Rendering edit');
                res.render('login/edit');
            });
            router.get('/logout', function(req, res){
                console.log('LoginController: Logout()...');
                req.logout();
                res.redirect('/');
            });
            
        };
        this.init = function(app,express){
           
            var router = express.Router();
            initRoutes(router);
            console.log('LoginController::init() -> Routes DONE.');
            initActions(router);
            console.log('LoginController::init() -> Actions DONE.');
            //Passport middlewares
            app.use(passport.initialize());
            //Session esetén (opcionális)
            app.use(passport.session());
            app.use(setLocalsForLayout);
            app.use('/login', router);
            console.log('LoginController::init() DONE.');
        }
    
        function initActions(router){
            
            
            var LocalStrategy = require('passport-local').Strategy;
            // Local Strategy for sign-up
            passport.use(
                    'local-signup', 
                    new LocalStrategy({
                           usernameField: 'username',
                            passwordField: 'password',
                            passReqToCallback: true,
                        },   
                        function(req, username, password, done) {
                            console.log('REG::USERNAME='+username);
                            console.log('REG::Password='+password);
                            req.app.models.users.findOne({ username: username }, function(err, user) {
                                if (err) { 
                                    console.log(err);
                                    return done(err); 
                                }
                                if (user) {
                                    console.log('Létező felhasználó');
                                    return done(null, false, { message: 'Létező felhasználó.' });
                                }
                                req.app.models.users.create(req.body).then(function (user) {
                                    console.log(user);
                                    return done(null, user);
                                }).catch(function (err) {
                                    console.log("ERROR "+err);
                                    return done(null, false, { message: err.details });
                                })
                            });
                        }
                    )
            );
    
            // Stratégia
            passport.use(
                    'local', 
                    new LocalStrategy({
                        usernameField: 'username',
                        passwordField: 'password',
                        passReqToCallback: true,
                    },
                    function(req, username, password, done) {
                            req.app.models.users.findOne({ neptun:username }, function(err, user) {
                            if (err) { return done(err); }
                            if (!user || !user.validPassword(password)) {
                            return done(null, false, { message: 'Helytelen adatok.' });
                        }
                    return done(null, user);
                    });
                }
           ));
    
    
            // Sorosítás a munkamenetbe
            passport.serializeUser(function(user, done) {
                done(null, user );
            });
    
            //Visszaállítás a munkamenetből
            passport.deserializeUser(function(obj, done) {
                done(null, obj);
            });
             router.post(    '/', 
                        passport.authenticate('local', 
                            {
                            successRedirect: '/',
                            failureRedirect: '/login',
                            failureFlash: true,
                            badRequestMessage: 'Hiányzó adatok'
                            }
                        )
            );
             router.post(    '/signin', 
                        passport.authenticate('local', 
                            {
                            successRedirect: '/',
                            failureRedirect: '/login',
                            failureFlash: true,
                            badRequestMessage: 'Hiányzó adatok'
                            }
                        )
            );
            router.post(    '/signup', 
                        passport.authenticate('local-signup', 
                            {
                            successRedirect:    '/recipes/list',
                            failureRedirect:    '/login/signup',
                            failureFlash:       true,
                            badRequestMessage:  'Hiányzó adatok'
                            }
                        )
            );
        }

    
        
}
    

module.exports = new LoginController();
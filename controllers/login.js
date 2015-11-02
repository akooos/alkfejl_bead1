function LoginController(){

        var passport = require('passport');
        
        this.ensureAuthenticated = function (req, res, next) {
            if (req.isAuthenticated()) 
            { 
                return next(); 
            }
            console.log("ensureAuthenticated::Redirect to login");
            
            res.redirect('/user/signin');
        };

        
        function setLocalsForLayout (req, res, next) {
            
                res.locals.loggedIn = req.isAuthenticated();
                res.locals.user = req.user;
                console.log('setLocalsForLayout req.isAuthenticated = ' + req.isAuthenticated());
                next();
        };
        function initRoutes(router){
       
            var rndSignin = function (req, res) {
                console.log('LoginController: Rendering signin');
                res.render('login/signin', { messages: req.flash('msgs') } );
            }
            router.get('/', rndSignin );
            router.get('/signin', rndSignin );
            router.get('/signup', function (req, res) {
                console.log('LoginController: Rendering signup');
                res.render('login/signup', { messages: req.flash('msgs') } );
            });
            router.get('/edit', function (req, res) {
                
                if ( req.isAuthenticated() ){
                
                    console.log('LoginController: Rendering edit');
                    res.render('login/edit', { messages: req.flash('msgs') , validationErrors: req.flash('validationErrors') } );
                } else
                     res.redirect('/user/signin');
            });
            router.get('/logout', function(req, res){
                console.log('LoginController: Logout()...');
                req.logout();
                res.redirect('/');
            });
            
        };
        this.init = function(app,express){
           
            var router = express.Router();
            
            //Passport middlewares
            app.use(passport.initialize());
            //Session esetén (opcionális)
            app.use(passport.session());
            
            initRoutes(router);
            console.log('LoginController::init() -> Routes DONE.');
            initActions(router);
            console.log('LoginController::init() -> Actions DONE.');
            app.use(setLocalsForLayout);
            app.use('/user/', router);
            console.log('LoginController::init() DONE.');
            
        }
    
        function initActions(router){
               // Sorosítás a munkamenetbe
            passport.serializeUser(function(user, done) {
                console.log('SERIALIZE');
               // console.log(user);
                done(null, user );
                console.log('-------------');
            });
    
            //Visszaállítás a munkamenetből
            passport.deserializeUser(function(obj, done) {
                console.log('DESERILAIZE');
               // console.log(obj);
                done(null, obj);
                console.log('-------------');
            });      
            
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
                            console.log('SIGNUP::USERNAME='+username);
                            console.log('SIGNUP::Password='+password);
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
                            console.log('SIGIN::USERNAME='+username);
                            console.log('SIGNIN::Password='+password);
                            req.app.models.users.findOne({ username:username }, function(err, user) {
                            if (err) {
                                console.log(err);
                                return done(err); 
                            }
                            if (!user || !user.validPassword(password)) {
                                console.log('Helytelen adatok.')
                            return done(null, false, { message: 'Helytelen adatok.' });
                        }
                        console.log(user);
                    return done(null, user);
                    });
                }
           ));
   
   
            router.post(  '/edit',
                        function (req, res) {
                            // adatok ellenőrzése
                            req.checkBody('email', 'Hibás az email!!').notEmpty().withMessage('Kötelező megadni!');
                            
                            //HIBA->    req.checkBody('email', 'Hibás email!').isEmail().withMessage('Email-t kötelező megadni! ');
                            
        
                            var validationErrors = req.validationErrors(true);
                            console.log('ValidationERRORS: '+validationErrors);
                            
                            if (validationErrors) {
                                req.flash('validationErrors', validationErrors);
                            } else {
                                        var uid = res.locals.user.id;
                                        req.app.models.users.update(
                                            { id:uid },
                                            {
                                                forename:  req.body.forename,
                                                surname: req.body.surname,
                                                avatar: req.body.avatar,
                                                email : req.body.email
                                            }
                                        ).then(function (oi) {
                                            //siker
                                            req.session.passport.user.forename = req.body.forename;
                                            req.session.passport.user.surname = req.body.surname;
                                            req.session.passport.user.avatar = req.body.avatar;
                                            req.session.passport.user.email = req.body.email;
                                            req.session.save();
                                        }).catch(function (err) {
                                            //hiba
                                            req.flash('msgs', err.toString());
                                            console.log('USerEdit error '+err);
                                        });
                                         
                                            
                                        
                                }
                            res.redirect('/user/edit');
                        }
            );
            router.post(    '/', 
                        passport.authenticate('local', 
                            {
                            successRedirect: '/recipes/list',
                            failureRedirect: '/login',
                            failureFlash: true,
                            badRequestMessage: 'Hiányzó adatok'
                            }
                        )
            );
             router.post(    '/signin', 
                        passport.authenticate('local', 
                            {
                            successRedirect: '/recipes/list',
                            failureRedirect: '/user',
                            failureFlash: true,
                            badRequestMessage: 'Hiányzó adatok'
                            }
                        )
            );
            router.post(    '/signup', 
                        passport.authenticate('local-signup', 
                            {
                            successRedirect:    '/recipes/list',
                            failureRedirect:    '/user/signup',
                            failureFlash:       true,
                            badRequestMessage:  'Hiányzó adatok'
                            }
                        )
            );
        }

    
        
}
    

module.exports = new LoginController();
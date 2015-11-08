function LoginController(){

        
        var passport = require('passport');
        
        var user = null;
        
        this.getUser = function(){
            return user;
        }
        
        this.restrictTo = function(role) {
            return function(req, res, next) {
                if (req.user.role == role) {
                    next();
                } else {
                    next(new Error('Unauthorized'));
                }
            }
        }
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
                if ( req.user !== undefined ){
                    res.locals.isOperator = req.user.role == 'operator';
                }else
                    res.locals.isOperator = false;
                //console.log('setLocalsForLayout req.isAuthenticated = ' + req.isAuthenticated());
                next();
        };
        function initRoutes(router){
       
            var rndSignin = function (req, res) {
                if ( !req.isAuthenticated() ){
                    console.log('LoginController: Rendering signin');
                    
                     var msgs = ( req.flash('msgs')  || [{}]).pop();
                     if ( msgs == undefined )
                      msgs = req.flash('error');
                    res.render('login/signin', { 'messages': msgs } );
                } else
                    res.redirect('/');
            }
            router.get('/', rndSignin );
            router.get('/signin', rndSignin );
            router.get('/signup', function (req, res) {
                if ( !req.isAuthenticated() ){
                    console.log('LoginController: Rendering signup');
                     var ve =  ( req.flash('validationErrors')  || [{}]).pop();
                     var msgs = ( req.flash('msgs')  || [{}]).pop();
                    
                    res.render('login/signup', { 'messages': msgs, validationErrors: ve } );
                } else
                    res.redirect('/');
            });
            router.get('/edit', function (req, res) {
                
                if ( req.isAuthenticated() ){
                
                    console.log('LoginController: Rendering edit');
                     var ve =  ( req.flash('validationErrors')  || [{}]).pop();
                     var msgs = ( req.flash('msgs')  || [{}]).pop();
                    
                    res.render('login/edit', { messages: msgs , 'validationErrors': ve } );
                } else
                     res.redirect('/user/signin');
            });
            router.get('/logout', function(req, res){
                console.log('LoginController: Logout()...');
                req.logout();
                res.redirect('/');
            });
            router.get('/list',function(req,res){
                
                
                if ( req.isAuthenticated() ){
                
                    req.app.models.users.find().sort({'cre_dt':'desc','upd_dt':'desc'}).then(
                    function (users) {
                    //megjelenítés
                    //console.log(users);
                    
                     var msgs = ( req.flash('msgs')  || [{}]).pop();
                    
                    res.render(
                            'login/list', 
                            { users: users,
                              messages: msgs
                            }
                           );
                }
            ).catch(function (err) {
                    console.log("ERROR Query:"+err);
            });
                } else
                     res.redirect('/user/signin');
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
               // console.log('SERIALIZE');
               // console.log(user);
                done(null, user );
               // console.log('END-------------' + ( new Date() ));
            });
    
            //Visszaállítás a munkamenetből
            passport.deserializeUser(function(obj, done) {
               // console.log('DESERILAIZE');
               // console.log(obj);
                done(null, obj);
                user = obj;
               // console.log('END-------------' + ( new Date() ));
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
                            //console.log('SIGNUP::Password='+password);
                            req.app.models.users.findOne({ username: username }, function(err, user) {
                                if (err) { 
                                    console.log(err);
                                    return done(err); 
                                }
                                if (user) {
                                    console.log('Létező felhasználó');
                                    return done(null, false, { messages: ['Létező felhasználó.'] });
                                }
                                req.app.models.users.create(req.body).then(function (user) {
                                    console.log('User created:'+user.username);
                                   // console.log(user);
                                    return done(null, user);
                                }).catch(function (err) {
                                    console.log("Local-signup-ERROR "+err);
                                    return done(null, false, { msgs: err.details });
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
                        badRequestMessage:  'Hiányzó adatok'
                    },
                    function(req, username, password, done) {
                            console.log('SIGIN::USERNAME='+username);
                            //console.log('SIGNIN::Password='+password);
                            req.app.models.users.findOne({ username:username }, function(err, user) {
                            if (err) {
                                console.log(err);
                                return done(err); 
                            }
                            if (!user || !user.validPassword(password)) {
                                console.log('Auth:Helytelen adatok.');
                                req.flash('msgs','Helytelen adatok.');
                            return done(null, false,'Helytelen adatok.');
                        }
                        console.log('SIGIN OK -> '+user.username);
                    return done(null, user);
                    });
                }
           ));
   
   
            router.post(  '/edit',
                        function (req, res) {
                            // adatok ellenőrzése
                            req.checkBody('email', 'Hibás az email!').notEmpty().withMessage('Kötelező megadni!');
                            req.checkBody('surname', 'Hibás a vezetéknév!').notEmpty().withMessage('Kötelező megadni!');
                            req.checkBody('forename', 'Hibás a keresztnév!').notEmpty().withMessage('Kötelező megadni!');
                            req.checkBody('email', 'Hibás a email!').isEmail().withMessage('Hibás email formátum!');
                            
                            //HIBA->    req.checkBody('email', 'Hibás email!').isEmail().withMessage('Email-t kötelező megadni! ');
                            var validationErrors = req.validationErrors(true);
                            console.log('ValidationERRORS: '+validationErrors);
                            
                            if (validationErrors) {
                                req.flash('validationErrors', validationErrors);
                                res.redirect('/user/edit');
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
                                            res.redirect('/');
                                        }).catch(function (err) {
                                            //hiba
                                            req.flash('msgs', err.toString());
                                            console.log('USerEdit error '+err);
                                            res.redirect('/user/edit');
                                        });
                                         
                                            
                                        
                                }
                            
                        }
            );
            
            router.post('/', 
                function(req,res,next){
                    next();
                },
                passport.authenticate('local', 
                {
                    successRedirect: '/recipes/list',
                    failureRedirect: '/user/signin',
                    failureFlash: true,
                    badRequestMessage: 'Hiányzó adatok'
                })
            );
             router.post(    '/signin',
                function(req,res,next){
                    next();
                    
                }
                 
                ,
                passport.authenticate('local', 
                {
                        successRedirect: '/recipes/list',
                        failureRedirect: '/user/signin',
                        failureFlash: true,
                        badRequestMessage: 'Hiányzó adatok'
                    }
                )
            );
            router.post(    '/signup', function(req,res,next){
                
                    req.checkBody('email', 'Hibás az email!').notEmpty().withMessage('Kötelező megadni!');
                    req.checkBody('surname', 'Hibás a vezetéknév!').notEmpty().withMessage('Kötelező megadni!');
                    req.checkBody('password', 'Hibás a jelszó!').notEmpty().withMessage('Kötelező megadni!');
                    req.checkBody('username', 'Hibás a felhasználónév!').notEmpty().withMessage('Kötelező megadni!');
                    req.checkBody('forename', 'Hibás a keresztnév!').notEmpty().withMessage('Kötelező megadni!');
                    req.checkBody('email', 'Hibás a email!').isEmail().withMessage('Hibás email formátum!');
                    req.checkBody('username', 'Hibás a jelszó!').isLength(4,10).withMessage('Jelszó hosszúságának 4 és 10 karakter között kell lennie!');
                    req.checkBody('password', 'Hibás a jelszó!').isLength(4,10).withMessage('Jelszó hosszúságának 4 és 10 karakter között kell lennie!');
                    
                            
                    //HIBA->    req.checkBody('email', 'Hibás email!').isEmail().withMessage('Email-t kötelező megadni! ');
                    var validationErrors = req.validationErrors(true);
                    console.log('ValidationERRORS: '+validationErrors);
                    if (validationErrors) {
                        req.flash('validationErrors', validationErrors);
                        res.redirect('/user/signup');
                    } else
                        next();
            },
                        passport.authenticate('local-signup', 
                            {
                            successRedirect:    '/recipes/list',
                            failureRedirect:    '/user/signup',
                            failureFlash:       true,
                            badRequestMessage:  'Hiányzó adatok'
                            }
                        )
            );
            router.get('/del', function (req,res){
                var uid = req.param('id');
                req.app.models.recipes.destroy({user:uid}).exec(function(err, users) {
                    if (err) {
                        console.log(err);
                        req.flash('msgs', err.toString());
                        res.redirect('list');
                        return;
                    } 
                    
                    req.app.models.users.destroy({id:uid}).exec(function(err, users) {    
                        if (err) {
                            console.log(err);
                            req.flash('msgs', err.toString());
                            res.redirect('list');
                        }
                        var cuid = req.session.passport.user.id;
                        if ( uid == cuid ){
                            res.redirect('logout');
                        }else
                            res.redirect('list');
                    });
                
        
            });
        });
  
        }

    
        
}
    

module.exports = new LoginController();
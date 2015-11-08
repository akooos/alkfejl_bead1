
function RecipesController(){

        this.init = function(app,express, godoo){
           
            var router = express.Router();
            initRoutes(router);
            initActions(router);
            app.use('/recipes',godoo,router);
           /*       
            app.param('id', function(req, res, next, id) {

                // save name to the request
                if ( id.isNaN() )
                {
                    req.id = -1;
                } else
                    req.id = id;

                next();
            });*/
            
            console.log('RecipesController::init() DONE.');
        }

        function initActions(router){
            
            router.post(  '/edit',
                        function (req, res) {
                            // adatok ellenőrzése
                            //req.checkBody('email', 'Hibás az email!!').notEmpty().withMessage('Kötelező megadni!');
                            req.checkBody('name', 'Hibás az recept név!').notEmpty().withMessage('Kötelező megadni!');
                            req.checkBody('description', 'Hibás a recept leírás!').notEmpty().withMessage('Kötelező megadni!');
                            
                            var validationErrors = req.validationErrors(true);
                            console.log('ValidationERRORS: ' + validationErrors);
                            var id = req.body.id;
                            
                            if (validationErrors) {
                                req.flash('validationErrors', validationErrors);
                                res.redirect('/recipes/edit?id='+id);
                            } else {
                                        //var uid = req.session.passport.user.id;
                                        req.app.models.recipes.update(
                                            {'id': id },
                                            {
                                                name:  req.body.name,
                                                "description": req.body["description"],
                                                headimg: req.body.headimg
                                            }
                                        ).then(function (oi) {
                                            //siker
                                            console.log('Recipe edited!');
                                            res.redirect('/recipes/list');
                                        }).catch(function (err) {
                                            //hiba
                                            req.flash('msgs', err.toString());
                                            console.log('RecipeEdit error '+err);
                                            res.redirect('/recipes/edit?id='+id);
                                        });
                                }
                        }
            );
            
            router.post(  '/new',
                        function (req, res) {
                            // adatok ellenőrzése
                       //    req.checkBody('email', 'Hibás az email!!').notEmpty().withMessage('Kötelező megadni!');
                            
                            //HIBA->    req.checkBody('email', 'Hibás email!').isEmail().withMessage('Email-t kötelező megadni! ');
                            req.checkBody('name', 'Hibás az recept név!').notEmpty().withMessage('Kötelező megadni!');
                            req.checkBody('description', 'Hibás a recept leírás!').notEmpty().withMessage('Kötelező megadni!');
        
                            var validationErrors = req.validationErrors(true);
                            console.log('ValidationERRORS: '+validationErrors);
                            
                            if (validationErrors) {
                                req.flash('validationErrors', validationErrors);
                                res.redirect('/recipes/new');
                            } else {
                                        var uid = req.session.passport.user.id;
                                        req.app.models.recipes.create(
                                            {
                                                name:  req.body.name,
                                                'description': req.body['description'],
                                                headimg: req.body.headimg,
                                                user:uid
                                            }
                                        ).then(function (oi) {
                                            //siker
                                            console.log('Recipe created:'+oi['name']);
                                            res.redirect('/recipes/list');
                                        }).catch(function (err) {
                                            //hiba
                                            req.flash('msgs', err.toString());
                                            console.log('RecipeNew error '+err);
                                            res.redirect('/recipes/new');
                                        });
                                }
                        }
            );
        }

        function initRoutes(router){  
            
            var rndList = function (req, res) {
                console.log("Rendering recipe list.");
                
                 var uid = req.session.passport.user.id;
                 
                 
                /*req.app.models.users.findOne( { id:uid }).populate('recipes').exec(function(err, users) {
                
                    if(err) // handle error
                    {
                        console.log('Error: ' + err);
                    } else
                        {
                            console.log(users);
                        }
                });
                */
                req.app.models.recipes.find({'user':uid}).sort({'cre_dt':'desc','upd_dt':'desc'}).then(function (recipes) {
                    res.render('recipe/list',{'messages':req.flash('msgs'),'recipes':recipes } );
                }).catch(function (err) {
                    //hiba
                    req.flash('msgs', err.toString());
                        res.render('recipe/list',{'messages':req.flash('msgs') } );
                    console.log('USerEdit error '+err);
                });
                
                
            };
            
            router.get('/', rndList );
            router.get('/list', rndList );
            router.get('/new', function (req, res) {
                console.log("Rendering recipe new.");
                var ve =  ( req.flash('validationErrors')  || [{}]).pop();
                var msgs = ( req.flash('msgs')  || [{}]).pop();
                res.render('recipe/new', { 'messages':msgs, 'validationErrors': ve });
        });
        router.get('/del', function (req,res){
            var rid = req.param('id');
            var uid = req.session.passport.user.id;
            req.app.models.recipes.destroy({id:rid,user:uid}).exec(function(err, users) {
                if (err) {
                    console.log(err);
                    req.flash('msgs', err.toString());
                } 
                res.redirect('list');
        
            });
        });
  
        router.get('/edit', function (req, res) {
            
            console.log("Rendering recipe edit.");
            
            
            var rid = req.param('id');
            var uid = req.session.passport.user.id;
            req.app.models.recipes.findOne({id:rid,user:uid}).then(function (recipe) {
                     var ve =  ( req.flash('validationErrors')  || [{}]).pop();
                     var msgs = ( req.flash('msgs')  || [{}]).pop();
                    res.render('recipe/edit', {'messages':msgs, 'recipe':recipe, 'validationErrors': ve });
                }).catch(function (err) {
                    //hiba
                    req.flash('msgs', err.toString());
                    res.render('recipe/edit', {'messages':req.flash('msgs') });
                    console.log('RecipeEdit error '+err);
                });
            
        });
    } 
    
}
module.exports= new RecipesController();

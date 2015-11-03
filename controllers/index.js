// controllers/index.js
function IndexController(){
    this.init = function(app, express){
        var router = express.Router();
        initRoutes(router);
        app.use('/',router);
        app.use('*',router);
    }
    function initRoutes(router){

        router.get('/', function (req, res) {
            console.log('IndexController:: Rendering list... ' + ( new Date() ));
            
            req.app.models.recipes.find().sort({'cre_dt':'desc','upd_dt':'desc'}).then(
                function (recipes) {
                //megjelenítés
                res.render(
                            'index', 
                            { recipes: recipes,
                              messages: req.flash('info')
                            }
                           );
                }
            ).catch(function (err) {
                    console.log("ERROR Query:"+err);
            });
            
        });
        router.get('/about', function (req, res) {
            console.log('IndexController:: Rendering about...');
            res.render('about');
        });
        router.get('/*', function (req, res) {
            console.log('IndexController:: Rendering 404...');
            res.render('404');
        });
    }
}
module.exports = new IndexController();
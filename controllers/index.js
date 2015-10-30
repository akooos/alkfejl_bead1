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
            console.log('IndexController:: Rendering list...');
            res.render('index');
        });
        router.get('/about', function (req, res) {
            console.log('IndexController:: Rendering about...');
            res.render('about');
        });
        router.get('*', function (req, res) {
            console.log('IndexController:: Rendering 404...');
            res.render('404');
        });
    }
}
module.exports = new IndexController();
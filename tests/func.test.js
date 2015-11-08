/*
    Functional testing probe
*/

var Browser = require('zombie');
var expect = require("chai").expect;
var RecipeApp = require('../recipeapp');

process.env.NODE_ENV = 'test';
var dbdriver         = 'memory' ;
//process.env.IP gave me 0.0.0.0 WTH?!
var ip               = '127.0.0.1';
var port             = 8000;

var app = new RecipeApp(dbdriver,port);
/*
var print_exception = function(err){
    console.log('Excepition handler: '+ err);
}
*/

// use zombie.js as headless browser
Browser.localhost(ip , port);
var browser = new Browser();

describe('Recipe Editor Functional Testing', function(){
   this.timeout(30000);
   before(function(done){
       app.start(done);
   });
   
   after(function(done){
       app.stop(done);
   });
   
   describe('Signup Test: User visits signup page',function(){
       before(function(){
           return browser.visit('/user/signup');
       });
       
        describe('Signup Test: Submits signup form', function() {

            before(function() {
                browser
                .fill('surname', 'admin')
                .fill('forename', 'admin')
                .fill('email', 'admin@recipeeditors.elte.hu')
                .fill('username', 'admin')
                .fill('password', 'admin');
                
                return browser.pressButton('#btnSubmit');
                
            });

            it('Signup Test: should be redirected to ../recipes/list', function() {
                    browser.assert.redirected();
                    browser.assert.url(new RegExp('.*(recipes\/list)$'));
            });
            
       });
   
   });
   
   describe('Logout Test: User clicks signout on menu',function(){
        
        before(function() {
            return browser.clickLink('#linkLogout');
                
        });

        it('Logout Test: should be redirected to ../', function() {
            browser.assert.redirected();
        });
   });
   
   describe('Signin Test: User visits signin page',function(){
       before(function(){
           return browser.visit('/user/signin');
       });
       
        describe('Signin Test: Submits signin form', function() {

            before(function() {
                browser
                .fill('username', 'admin')
                .fill('password', 'admin');
                
                return browser.pressButton('#btnSubmit');
                
            });

            it('Signin Test: should be redirected to ../recipes/list', function() {
                    browser.assert.success();
                    browser.assert.url(new RegExp('.*(recipes\/list)$'));
            });
            
       });
   
   });
   
   describe('Recipe Add Test: User clicks \"New Recipe\" link on menu',function(){
       before(function(){
           //assume we are logged in...
           return browser.clickLink('#linkNewRecipe');
       });
       
        describe('Recipe Add Test: Submits new recipe form', function() {

            before(function() {
                browser
                .fill('name', 'TestRecipe')
                .fill('description', 'ingredients 1 \n ingredients 2 \n ingredients 3')
                .fill('headimg', 'http://'+ip+':'+port+'/restaurant26.png');
                
                return browser.pressButton('#btnSubmit');
                
            });

            it('Recipe Add Test: should be redirected to ../recipes/list', function() {
                    browser.assert.redirected();
                    browser.assert.url(new RegExp('.*(recipes\/list)$'));
            });
            
       });
   
   });

});


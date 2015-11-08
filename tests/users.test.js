/*
    Unit testing probe
    Mocha, Chai..
*/
process.env.NODE_ENV = 'test';
var expect = require("chai").expect;
//var should = require('chai').should();
var Waterline = require('waterline');
var waterlineConfig = require('../config/waterline_config.js');
var usersCollection = require('../models/users');
var recipesCollection = require('../models/recipes');
var bcrypt = require('bcryptjs');

var Users;
//var Recipes;

before(function (done) {
    // ORM indítása
    var orm = new Waterline();    

    orm.loadCollection(Waterline.Collection.extend(usersCollection));
    orm.loadCollection(Waterline.Collection.extend(recipesCollection));
    waterlineConfig.connections.default.adapter = 'memory';

    orm.initialize(waterlineConfig, function(err, models) {
        if(err){ 
               done();
            throw err;
        }
        
        Users = models.collections.users;
     //   Recipes = models.collections.recipes;
        done();
    });
    
});

describe('UsersModel', function () {
 
    after(function (done) {
        Users.destroy({}, function (err) {
            if (err != null && err != undefined )
                console.log(err);
            done();
        });
    });
   
    it('should be able to create a user', function () {
    return Users.create({
            username: 'abcdef',
            password: 'jelszo',
            surname: 'Gipsz',
            forename: 'Jakab',
            email: 'Jakab12342134@gmail.com',
            avatar: '',
        }).then(function (user) {
                expect(user.username).to.equal('abcdef');
                expect(bcrypt.compareSync('jelszo', user.password)).to.be.true;
                expect(user.surname).to.equal('Gipsz');
                expect(user.forename).to.equal('Jakab');
                expect(user.avatar).to.equal('');
                expect(user.email).to.equal('Jakab12342134@gmail.com');
                
            });
            
    }); 
    
    it('should be able to edit a user', function () {
        
        return Users.update(
                {username: 'abcdef'  },
                {
                    surname: 'Teszt',
                    forename: 'Elek',
                    email: 'tesztelek134@gmail.com'
                }
            );
    });
    
    it('should be able to find a user', function () {
        return Users.findOne().where({username: 'abcdef'}).then(function (usr) {
                    expect(usr).to.be.defined;
                    expect(usr.surname).to.equal('Teszt');
                    expect(usr.forename).to.equal('Elek');
                    expect(usr.email).to.equal('tesztelek134@gmail.com');
                   
              });
        
    });

});
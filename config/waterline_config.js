
var diskAdapter = require('sails-disk');

// ORM - konfiguráció
var config = {
    adapters: {
        disk:       diskAdapter,
    },
    connections: {
        default: {
            adapter: 'disk',
        },
        disk: {
            adapter: 'disk'
        }
    },
    defaults: {
        migrate: 'alter'
    }
};

module.exports = config;



var memoryAdapter = require('sails-memory');
var diskAdapter = require('sails-disk');

// ORM - konfiguráció
var config = {
    adapters: {
        disk:       diskAdapter,
        memory:     memoryAdapter
    },
    connections: {
        default: {
            adapter: 'disk',
        },
        disk: {
            adapter: 'disk'
        },
        memory: {
            adapter: 'memory'
        }
    },
    defaults: {
        /*
        migrate: 'alter'
        */
        migrate: 'safe'
    }
};

module.exports = config;


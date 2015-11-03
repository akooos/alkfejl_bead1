module.exports = { 
    identity: 'recipes',
    connection: 'default',
    attributes: {
        name: {
            type: 'string',
            required: true
        },
        headimg:{
            type: 'string',
            required:false
        },
        description: {
            type: 'string',
            required: true
        },
        user: {
            model: 'users'
        }
    }
};
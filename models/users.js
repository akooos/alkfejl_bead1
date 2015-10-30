var bcrypt = require('bcryptjs');
module.exports = {
    identity: 'users',
    connection: 'default',
    attributes: {
        password: {
            type: 'string',
            required: true,
        },
        surname: {
            type: 'string',
            required: true,
        },
        forename: {
            type: 'string',
            required: true,
        },
        avatar: {
            type: 'string',
            url: true,
        },
        email:{
            type: 'string',
            required:true,
        },
        role: {
            type: 'string',
            enum: ['recipeeditor', 'operator'],
            required: true,
            defaultsTo: 'recipeeditor'
        },
        recipes: {
            collection: 'recipes',
            via: 'user'
        },
        validPassword: function (password) {
            return bcrypt.compareSync(password, this.password);
        }
    },
    beforeCreate: function(values, next) {
            bcrypt.hash(values.password, 10, function(err, hash) {
            if (err) {
                return next(err);
            }
            values.password = hash;
            next();
        });
    }
};
const mongoose = require('mongoose');

const cryptoSchema = mongoose.Schema(
    {
        currency: {
            type: 'String',
            required: true
        }, 
        value: {
            type: 'Number',
            required: true
        }
    }
);

const Crypto = mongoose.model('Crypto', cryptoSchema);
module.exports = Crypto;
const mongoose = require('mongoose');

const walletsSchema = mongoose.Schema(
    {
        user: {
            type: 'String',
            required: true,
            unique: true,
            index: true,
        },
        balance: {
            type: 'Number',
            default: '0'
        }
    }
);

const Wallet = mongoose.model('Wallets', walletsSchema);

Wallet.createIndexes();

module.exports = Wallet;
const mongoose = require('mongoose');

const accountSchema = mongoose.Schema(
    {
        firstName: 'String',
        lastName: 'String',
        email: {
            type: 'String',
            unique: true,
            index: true,
        },
        password: 'String',
    }
);


const Account = mongoose.model('Accounts', accountSchema);

Account.createIndexes();

module.exports = Account;
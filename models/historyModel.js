const mongoose = require('mongoose');

const historySchema = mongoose.Schema(
    {
        buyer: 'String',
        firstname: 'String',
        lastname: 'String',
        price: 'Number',
        currency: 'String',
        action: 'String',
        amount: {
            type: 'Number',
            default: 0
        },
        date: {
            type: 'Date',
            default: Date.now
        }
    }
);

const History = mongoose.model('History', historySchema);
module.exports = History;
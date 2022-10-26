const mongoose = require('mongoose');

const holdingSchema = mongoose.Schema(
    {
        account: 'String',
        crypto: 'String',
        amount: {
            type: 'Number',
            default: 0
        }

    }
);

const Holding = mongoose.model('Holdings', holdingSchema);
module.exports = Holding;
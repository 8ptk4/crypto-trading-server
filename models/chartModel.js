const mongoose = require('mongoose');

const chartSchema = mongoose.Schema(
    {
        btc: {
            type: 'Number',
            required: true
        },
        bc: {
            type: 'Number',
            required: true
        },
        date: {
            type: 'Date',
            default: Date.now,
            required: true
        } 
    }
);


const Chart = mongoose.model('Chart', chartSchema);

module.exports = Chart;
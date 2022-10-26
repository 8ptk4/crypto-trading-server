const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.ATLAS_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    } catch (err) {
        console.log(err);
    }
}

module.exports = connectDB
const mongoose = require('mongoose');

const otherCryptoSchema = new mongoose.Schema({
    rank: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('otherCrypto', otherCryptoSchema);
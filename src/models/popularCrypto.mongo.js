const mongoose = require('mongoose');

const popularCryptoSchema = new mongoose.Schema({
    rank: {
        type: Number,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    hourChange: {
        type: String,
        required: true,
    },
    dayChange: {
        type: String,
        required: true,
    },
    weekChange: {
        type: String,
        required: true,
    },
    marketCap: {
        type: String,
        required: true,
    },
    dayVolume: {
        type: String,
        required: true,
    },
    circulatingSupply: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('popularCrypto', popularCryptoSchema);
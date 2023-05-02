const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
    rank: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    hourChange: {
        type: Number,
        required: true,
    },
    dayChange: {
        type: Number,
        required: true,
    },
    weekChange: {
        type: Number,
        required: true,
    },
    marketCap: {
        type: Number,
        required: true,
    },
    dayVolume: {
        type: Number,
        required: true,
    },
    circulatingSupply: {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model('Crypto', cryptoSchema);
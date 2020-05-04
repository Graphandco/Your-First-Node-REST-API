const mongoose = require('mongoose');

const codingTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    codingTipDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
    language: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('CodingTip', codingTypeSchema);

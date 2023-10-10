const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomType: {
        type: String,
        required: true,
        enum: ['A', 'B', 'C']
    },
    roomCount: {
        type: Number,
        required: true,
        default: 0
    },
    pricePerHour: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Room', roomSchema);

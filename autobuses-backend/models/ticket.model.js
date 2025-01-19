const {Schema, model} = require('mongoose');

const ticketSchema = new Schema({
    idTicket: {
        type: Number,
        unique: true,
        required: true,
        min: 1
    },
    journey: {
        type: Schema.Types.ObjectId,
        ref: 'journeys',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    }

});

module.exports = model('tickets', ticketSchema);
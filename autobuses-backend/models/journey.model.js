const {Schema, model} = require('mongoose');

const journeySchema = new Schema({
    idJourney: {
        type: Number,
        unique: true,
        required: true,
        min: 1
    },
    seatsAvailable: {
        type: Number,
        min: 1
    },
    deapartureDate: {
        type: String,
        required: true,
        maxlength: 10
    },
    deapartureTime: {
        type: String,
        required: true,
        maxlength: 10
    },
    price: {
        type: Number,
        required: true,
        min: 1
    },
    bus: {
        type: Schema.Types.ObjectId,
        ref: 'buses',
        required: true
    },
    driver: {
        type: Schema.Types.ObjectId,
        ref: 'drivers',
        required: true
    },
    origin: {
        type: Schema.Types.ObjectId,
        ref: 'terminals',
        required: true
    },
    destination: {
        type: Schema.Types.ObjectId,
        ref: 'terminals',
        required: true
    }
});

module.exports = model('journeys', journeySchema);
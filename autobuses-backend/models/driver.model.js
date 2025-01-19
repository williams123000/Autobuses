const {Schema, model} = require('mongoose');

const driverSchema = new Schema({
    idDriver: {
        type: Number,
        unique: true,
        required: true,
        min: 1
    },
    name: {
        type: String,
        required: true,
        maxlength: 50
    },
    lastName: {
        type: String,
        required: true,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        maxlength: 50
    },
    lisenseNumber: {
        type: String,
        required: true,
        maxlength: 30
    },
    phone: {
        type: String,
        required: true,
        maxlength: 20
    },
    gender: {
        type: String,
        required: true,
        maxlength: 20
    },
    birthdate: {
        type: String,
        required: true,
        maxlength: 50
    },
    address: {
        type: String,
        required: true,
        maxlength: 50
    },
    terminal: {
        type: Schema.Types.ObjectId,
        ref: 'terminals',
        required: true
    }
});

module.exports = model('drivers', driverSchema);
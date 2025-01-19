const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    idUser: {
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
    phone: {
        type: String,
        required: true,
        maxlength: 10
    },
    journey: {
        type: Schema.Types.ObjectId,
        ref: 'journeys',
        required: true
    }

});

module.exports = model('users', userSchema);
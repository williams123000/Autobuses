const {Schema, model} = require('mongoose');

const busSchema = new Schema({
    idBus: {
        type: Number,
        unique: true,
        required: true,
        min: 1
    },
    numSeating: {
        type: Number,
        required: true,
        min: 1
    },
    tuition: {
        type: String,
        required: true,
        maxlength: 10
    },
    brand: {
        type: String,
        required: true,
        maxlength: 50
    },
    model: {
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

module.exports = model('buses', busSchema);
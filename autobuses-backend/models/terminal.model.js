const { Schema, model } = require('mongoose');

const terminalSchema = new Schema({
    idTerminal: { 
        type: Number, 
        unique: true, 
        required: true, 
        min: 1 
    },
    state: { 
        type: String, 
        required: true, 
        maxlength: 50 
    },
    address: { 
        type: String, 
        required: true, 
        maxlength: 50 
    }
});

module.exports = model('terminals', terminalSchema);
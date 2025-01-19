const mongoose = require('mongoose');
require('dotenv').config();

var API_BD = process.env.API_BD;
console.log(API_BD);

const connect = async () => {
    try {
        await mongoose.connect(API_BD);
        console.log('Conexión exitosa a la base de datos');
    } catch (error) {
        console.log('Error al conectar a la base de datos:', error);
        process.exit(1);
    }
};

module.exports = { connect };
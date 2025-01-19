const express = require('express');
const cors = require('cors');
const { connect } = require('./config/database');
require('dotenv').config();


// Importar rutas
const terminalRoutes = require('./routes/terminal.routes');
const busRoutes = require('./routes/bus.routes');
const driverRoutes = require('./routes/driver.routes');
const journeyRoutes = require('./routes/journey.routes');
const ticketRoutes = require('./routes/ticket.routes');
const userRoutes = require('./routes/user.routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a la base de datos
connect();

// Rutas
app.use(process.env.ROUTE_T, terminalRoutes);
app.use(process.env.ROUTE_A, busRoutes);
app.use(process.env.ROUTE_C, driverRoutes);
app.use(process.env.ROUTE_V, journeyRoutes);
app.use(process.env.ROUTE_B, ticketRoutes);
app.use(process.env.ROUTE_U, userRoutes);

// Ruta por defecto
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Bienvenido a la API de autobuses' });
});

// Ruta 404
app.get('*', (req, res) => {
    res.status(404).json({ message: 'Error 404 Ruta no encontrada' });
});

// Arrancar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
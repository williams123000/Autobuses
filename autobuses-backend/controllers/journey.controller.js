const Terminal = require('../models/terminal.model');
const Journey = require('../models/journey.model');
const Bus = require('../models/bus.model');
const Driver = require('../models/driver.model');
const User = require('../models/user.model');
const Ticket = require('../models/ticket.model');

exports.createJourney = async (req, res) => {
    try {
        const id_Bus = req.body.bus;
        const bus = await Bus.findOne({ idBus: id_Bus }).exec();
        const id_Driver = req.body.driver;
        const driver = await Driver.findOne({ idDriver: id_Driver }).exec();
        const id_Origin = req.body.origin;
        const origin = await Terminal.findOne({ idTerminal: id_Origin }).exec();
        const id_Destination = req.body.destination;
        const destination = await Terminal.findOne({ idTerminal: id_Destination }).exec();

        if (!bus) {
            return res.status(404).json({ message: 'El bus no existe' });
        }

        if (!driver) {
            return res.status(404).json({ message: 'El conductor no existe' });
        }

        if (!origin) {
            return res.status(404).json({ message: 'El origen no existe' });
        }

        if (!destination) {
            return res.status(404).json({ message: 'El destino no existe' });
        }

        const journey = req.body;
        journey.bus = bus._id;
        journey.driver = driver._id;
        journey.origin = origin._id;
        journey.destination = destination._id;
        // Asignar los asientos disponibles según el autobús
        journey.seatsAvailable = bus.numSeating;

        const instancia = new Journey(journey);
        const documento = await instancia.save();
        res.status(200).json(documento);
    } catch (error) {
        res.status(400).json({ message: 'Error al guardar el viaje (Ya existe un viaje con el mismo id)', error });
    }
};

exports.getJourneys = async (req, res) => {
    try {
        const result = await Journey.find().populate('bus', { _id: 0, idBus: 1, numSeating: 1, tuition: 1, brand: 1, model: 1 }).populate('driver', { _id: 0, idDriver: 1, name: 1, lastName: 1, email: 1, lisenseNumber: 1, phone: 1, geder: 1, birthdate: 1, address: 1 }).populate('origin', { _id: 0, idTerminal: 1, state: 1, address: 1 }).populate('destination', { _id: 0, idTerminal: 1, state: 1, address: 1 }).exec();
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: 'Error al obtener los viajes' });
    }
};

exports.getJourneyById = async (req, res) => {
    try {
        const result = await Journey.findOne({ idJourney: req.params.id }).populate('bus', { _id: 0, idBus: 1, numSeating: 1, tuition: 1, brand: 1, model: 1 }).populate('driver', { _id: 0, idDriver: 1, name: 1, lastName: 1, email: 1, lisenseNumber: 1, phone: 1, geder: 1, birthdate: 1, address: 1 }).populate('origin', { _id: 0, idTerminal: 1, state: 1, address: 1 }).populate('destination', { _id: 0, idTerminal: 1, state: 1, address: 1 }).exec();
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: 'Error al obtener el viaje' });
    }
};

exports.updateJourney = async (req, res) => {
    try {
        const id_Bus = req.body.bus;
        const bus = await Bus.findOne({ idBus: id_Bus }).exec();
        const id_Driver = req.body.driver;
        const driver = await Driver.findOne({ idDriver: id_Driver }).exec();
        const id_Origin = req.body.origin;
        const origin = await Terminal.findOne({ idTerminal: id_Origin }).exec();
        const id_Destination = req.body.destination;
        const destination = await Terminal.findOne({ idTerminal: id_Destination }).exec();
        

        if (!bus) {
            return res.status(404).json({ message: 'El bus no existe' });
        }

        if (!driver) {
            return res.status(404).json({ message: 'El conductor no existe' });
        }

        if (!origin) {
            return res.status(404).json({ message: 'El origen no existe' });
        }

        if (!destination) {
            return res.status(404).json({ message: 'El destino no existe' });
        }

        const journey = req.body;
        journey.bus = bus._id;
        journey.driver = driver._id;
        journey.origin = origin._id;
        journey.destination = destination._id;

        const result = await Journey.updateOne({ idJourney: req.params.id }, { $set: journey });
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar el viaje' });
    }
};

exports.deleteJourney = async (req, res) => {
    try {
        // 1. Buscar el viaje por su ID
        const journey = await Journey.findOne({ idJourney: req.params.id });
        if (!journey) {
            return res.status(404).json({ 
                message: 'El viaje no existe' 
            });
        }

        // 2. Verificar si hay usuarios asociados a este viaje
        const usersAssociated = await User.find({ journey: journey._id });
        if (usersAssociated.length > 0) {
            return res.status(400).json({
                message: 'No se puede eliminar el viaje porque hay usuarios que han reservado tickets para este viaje',
                usersCount: usersAssociated.length
            });
        }

        // 3. Verificar si hay tickets asociados a este viaje
        const ticketsAssociated = await Ticket.find({ journey: journey._id });
        if (ticketsAssociated.length > 0) {
            return res.status(400).json({
                message: 'No se puede eliminar el viaje porque hay tickets asociados a este viaje',
                ticketsCount: ticketsAssociated.length
            });
        }

        // 4. Si no hay usuarios ni tickets asociados, eliminar el viaje
        const result = await Journey.deleteOne({ idJourney: req.params.id });
        
        if (result.deletedCount === 0) {
            return res.status(404).json({ 
                message: 'No se encontró el viaje para eliminar' 
            });
        }

        res.status(200).json({ 
            message: 'Viaje eliminado exitosamente',
            result 
        });

    } catch (error) {
        res.status(500).json({ 
            message: 'Error al intentar eliminar el viaje', 
            error: error.message 
        });
    }
};


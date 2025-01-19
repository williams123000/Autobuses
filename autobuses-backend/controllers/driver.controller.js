const Driver = require('../models/driver.model');
const Journey = require('../models/journey.model');
const Terminal = require('../models/terminal.model');


exports.createDriver = async (req, res) => {
    try {
        const id_Terminal = req.body.terminal;
        const terminal = await Terminal.findOne({ idTerminal: id_Terminal }).exec();

        if (!terminal) {
            return res.status(404).json({ message: 'La terminal no existe' });
        }

        const driver = req.body;
        driver.terminal = terminal._id;

        const instancia = new Driver(driver);
        const documento = await instancia.save();
        res.status(200).json(documento);
    } catch (error) {
        res.status(400).json({ message: 'Error al guardar el conductor (Ya existe un conductor con el mismo id)', error });
    }
};

exports.getDrivers = async (req, res) => {
    try {
        const result = await Driver.find().populate('terminal', { _id: 0, idTerminal: 1, state: 1, address: 1 }).exec();
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: 'Error al obtener los conductores' });
    }
};

exports.getDriverById = async (req, res) => {
    try {
        const result = await Driver.findOne({ idDriver: req.params.id }).populate('terminal', { _id: 0, idTerminal: 1, state: 1, address: 1 }).exec();
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: 'Error al obtener el conductor' });
    }
};

exports.updateDriver = async (req, res) => {
    try {
        const id_Terminal = req.body.terminal;
        const terminal = await Terminal.findOne({ idTerminal: id_Terminal }).exec();

        if (!terminal) {
            return res.status(404).json({ message: 'La terminal no existe' });
        }

        const driver = req.body;
        driver.terminal = terminal._id;

        const result = await Driver.updateOne({ idDriver: req.params.id }, { $set: driver });
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar el conductor' });
    }
};

exports.deleteDriver = async (req, res) => {
    try {
        // 1. Buscar el conductor por su ID
        const driver = await Driver.findOne({ idDriver: req.params.id });
        if (!driver) {
            return res.status(404).json({ 
                message: 'El conductor no existe' 
            });
        }

        // 2. Verificar si hay viajes asignados a este conductor
        const journeysAssigned = await Journey.find({ driver: driver._id });
        if (journeysAssigned.length > 0) {
            // Obtener información detallada de los viajes para el mensaje de error
            const journeyDetails = journeysAssigned.map(journey => ({
                idJourney: journey.idJourney,
                departureDate: journey.deapartureDate,
                departureTime: journey.deapartureTime
            }));

            return res.status(400).json({
                message: 'No se puede eliminar el conductor porque tiene viajes asignados',
                journeysCount: journeysAssigned.length,
                journeys: journeyDetails
            });
        }

        // 3. Si no hay viajes asignados, eliminar el conductor
        const result = await Driver.deleteOne({ idDriver: req.params.id });
        
        if (result.deletedCount === 0) {
            return res.status(404).json({ 
                message: 'No se encontró el conductor para eliminar' 
            });
        }

        res.status(200).json({ 
            message: 'Conductor eliminado exitosamente',
            result 
        });

    } catch (error) {
        res.status(500).json({ 
            message: 'Error al intentar eliminar el conductor', 
            error: error.message,
            details: 'Contacta al administrador del sistema'
        });
    }
};
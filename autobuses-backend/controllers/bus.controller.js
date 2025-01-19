const Bus = require('../models/bus.model');
const Driver = require('../models/driver.model');
const Journey = require('../models/journey.model');
const Terminal = require('../models/terminal.model');

exports.createBus = async (req, res) => {
    try {
        const id_Terminal = req.body.terminal;
        const terminal = await Terminal.findOne({ idTerminal: id_Terminal }).exec();

        if (!terminal) {
            return res.status(404).json({ message: 'La terminal no existe' });
        }

        const bus = req.body;
        bus.terminal = terminal._id;

        const instancia = new Bus(bus);
        const documento = await instancia.save();
        res.status(200).json(documento);
    } catch (error) {
        res.status(400).json({ message: 'Error al guardar el autobús (Ya existe un autbus con el mismo id)', error });
    }
};

exports.getBuses = async (req, res) => {
    try {
        const result = await Bus.find().populate('terminal', { _id: 0, idTerminal: 1, state: 1, address: 1 }).exec();
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: 'Error al obtener los autobuses' });
    }
};

exports.getBusById = async (req, res) => {
    try {
        const result = await Bus.findOne({ idBus: req.params.id }).populate('terminal', { _id: 0, idTerminal: 1, state: 1, address: 1 }).exec();
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: 'Error al obtener el autobús' });
    }
}

exports.updateBus = async (req, res) => {
    try {
        const id_Terminal = req.body.terminal;
        const terminal = await Terminal.findOne({ idTerminal: id_Terminal }).exec();

        if (!terminal) {
            return res.status(404).json({ error: 'La terminal no existe' });
        }

        // Obtener el bus actual antes de la actualización
        const currentBus = await Bus.findOne({ idBus: req.params.id });
        if (!currentBus) {
            return res.status(404).json({ error: 'El autobús no existe' });
        }

        const bus = req.body;
        bus.terminal = terminal._id;

        // Calcular la diferencia en el número de asientos
        const seatsDifference = bus.numSeating - currentBus.numSeating;

        // Actualizar el autobús
        const result = await Bus.updateOne({ idBus: req.params.id }, { $set: bus });

        // Si hay cambio en el número de asientos, actualizar los viajes asociados
        if (seatsDifference !== 0) {
            // Buscar todos los viajes asociados a este autobús
            const associatedJourneys = await Journey.find({ bus: currentBus._id });

            // Actualizar los asientos disponibles en cada viaje
            for (const journey of associatedJourneys) {
                // Calcular los asientos ocupados en el viaje actual
                const occupiedSeats = currentBus.numSeating - journey.seatsAvailable;
                
                // Calcular los nuevos asientos disponibles
                // No puede ser menor que 0 ni mayor que el nuevo total de asientos
                const newSeatsAvailable = Math.max(0, Math.min(bus.numSeating - occupiedSeats, bus.numSeating));

                await Journey.updateOne(
                    { _id: journey._id },
                    { $set: { seatsAvailable: newSeatsAvailable } }
                );
            }

            return res.status(200).json({
                busUpdate: result,
                message: `Se actualizó el autobús y ${associatedJourneys.length} viajes asociados`,
                seatsDifference: seatsDifference,
                journeysUpdated: associatedJourneys.length
            });
        }

        res.status(200).json({
            busUpdate: result,
            message: 'Se actualizó el autobús sin cambios en los asientos'
        });

    } catch (error) {
        res.status(400).json({ 
            message: 'Error al actualizar el autobús', 
            error: error.message 
        });
    }
};

exports.deleteBus = async (req, res) => { 
    try {
        // 1. Buscar el autobús por su ID
        const bus = await Bus.findOne({ idBus: req.params.id });
        if (!bus) {
            return res.status(404).json({ 
                message: 'El autobús no existe' 
            });
        }

        // 2. Verificar si hay viajes asociados a este autobús
        const journeysAssociated = await Journey.find({ bus: bus._id });
        if (journeysAssociated.length > 0) {
            // Obtener información detallada de los viajes para el mensaje de error
            const journeyDetails = journeysAssociated.map(journey => ({
                idJourney: journey.idJourney,
                departureDate: journey.deapartureDate,
                departureTime: journey.deapartureTime
            }));

            return res.status(400).json({
                message: 'No se puede eliminar el autobús porque tiene viajes asociados',
                journeysCount: journeysAssociated.length,
                journeys: journeyDetails
            });
        }

        // 3. Eliminar el autobús  
        const result = await Bus.deleteOne({ idBus: req.params.id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ 
                message: 'No se encontró el autobús para eliminar' 
            });
        }

        res.status(200).json({ 
            message: 'Autobús eliminado correctamente' 
        });


    }
    catch (error) {
        res.status(400).json({ 
            message: 'Error al intentar eliminar el autobús', 
            error: error.message 
        });
    }

};
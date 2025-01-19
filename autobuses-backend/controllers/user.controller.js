const Journey = require('../models/journey.model');
const User = require('../models/user.model');
const Ticket = require('../models/ticket.model');

exports.createUser = async (req, res) => {
    try {
        // 1. Extraer la información del viaje del body
        const idJourney = req.body.journey;

        // 2. Buscar el viaje
        const journey = await Journey.findOne({ idJourney: idJourney });

        // Verificar si el viaje existe
        if (!journey) {
            return res.status(404).json({ message: 'El viaje no existe' });
        }

        // 3. Verificar si hay asientos disponibles
        if (journey.seatsAvailable <= 0) {
            return res.status(400).json({ message: 'No hay asientos disponibles para este viaje' });
        }

        // 4. Crear el usuario
        const userData = {
            idUser: req.body.idUser,
            name: req.body.name,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            journey: journey._id
        };

        const user = new User(userData);
        const savedUser = await user.save();

        // 5. Crear el ticket
        const lastTicket = await Ticket.findOne().sort({ idTicket: -1 });
        const newTicketId = lastTicket ? lastTicket.idTicket + 1 : 1;

        const newTicket = new Ticket({
            idTicket: newTicketId,
            journey: journey._id,
            user: savedUser._id
        });

        const savedTicket = await newTicket.save();

        // 6. Actualizar los asientos disponibles usando una transacción
        await Journey.findOneAndUpdate(
            { _id: journey._id, seatsAvailable: { $gt: 0 } },
            { $inc: { seatsAvailable: -1 } },
            { new: true }
        );

        // 7. Obtener la información completa para la respuesta
        const result = await User.findById(savedUser._id)
            .populate({
                path: 'journey',
                populate: ['origin', 'destination', 'bus', 'driver']
            });

        res.status(200).json({
            user: result,
            ticket: savedTicket
        });

    } catch (error) {
        res.status(400).json({
            message: 'Ya existe un usuario con ese ID',
            error: error.message
        });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const result = await User.find().populate('journey', { _id: 0, idJourney: 1, seatsAvailable: 1, deapartureDate: 1, deapartureTime: 1, price: 1 }).exec();
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: 'Error al obtener los usuarios' });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const result = await User.findOne({ idUser: req.params.id }).populate('journey', { _id: 0, idJourney: 1, seatsAvailable: 1, deapartureDate: 1, deapartureTime: 1, price: 1 }).exec();
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: 'Error al obtener el usuario' });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const idJourney = req.body.journey;
        const journey = await Journey.findOne({ idJourney: idJourney }).exec();

        if (!journey) {
            return res.status(404).json({ error: 'El viaje no existe' });
        }

        const user = req.body;
        user.journey = journey._id;

        const result = await User.updateOne({ idUser: req.params.id }, { $set: user });
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar el usuario' });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        // 1. Encontrar el usuario
        const user = await User.findOne({ idUser: req.params.id });
        if (!user) {
            return res.status(404).json({ error: 'El usuario no existe' });
        }

        // 2. Encontrar el ticket asociado al usuario
        const ticket = await Ticket.findOne({ user: user._id });
        if (!ticket) {
            // Si no hay ticket, solo eliminamos el usuario
            await User.deleteOne({ idUser: req.params.id });
            return res.status(200).json({ message: 'Usuario eliminado (no tenía ticket asociado)' });
        }

        // 3. Incrementar los asientos disponibles en el viaje
        await Journey.updateOne(
            { _id: ticket.journey },
            { $inc: { seatsAvailable: 1 } }
        );

        // 4. Eliminar el ticket
        await Ticket.deleteOne({ _id: ticket._id });

        // 5. Eliminar el usuario
        await User.deleteOne({ idUser: req.params.id });

        res.status(200).json({
            message: 'Usuario y ticket eliminados correctamente, asientos actualizados'
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error al eliminar el usuario y sus datos asociados',
            error: error.message
        });
    }
};
const Terminal = require('../models/terminal.model');
const Ticket = require('../models/ticket.model');
const User = require('../models/user.model');
const Journey = require('../models/journey.model');


exports.createTicket = async (req, res) => {
    try {
        const id_Journey = req.body.journey;
        const journey = await Journey.findOne({ idJourney: id_Journey }).exec();

        if (!journey) {
            return res.status(404).json({ error: 'El viaje no existe' });
        }

        // Ya no verificamos asientos disponibles aquí
        const ticket = req.body;
        ticket.journey = journey._id;

        const instancia = new Ticket(ticket);
        const documento = await instancia.save();

        res.status(200).json(documento);
    } catch (error) {
        res.status(400).json({ message: 'Error al guardar el boleto (Ya existe un boleto con el mismo id)', error });
    }
};

exports.getTickets = async (req, res) => {
    try {
        const result = await Ticket.find().populate('journey', { _id: 0, idJourney: 1, seatsAvailable: 1, deapartureDate: 1, deapartureTime: 1, price: 1 }).populate('user', { _id: 0, idUser: 1, name: 1, lastName: 1, email: 1, phone: 1 }).exec();
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: 'Error al obtener los boletos' });
    }
};

exports.getTicketById = async (req, res) => {
    try {
        const result = await Ticket.findOne({ idTicket: req.params.id }).populate('journey', { _id: 0, idJourney: 1, seatsAvailable: 1, deapartureDate: 1, deapartureTime: 1, price: 1 }).populate('user', { _id: 0, idUser: 1, name: 1, lastName: 1, email: 1, phone: 1 }).exec();
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: 'Error al obtener el boleto' });
    }s
};

exports.updateTicket = async (req, res) => {
    try {
        const id_Journey = req.body.journey;
        const journey = await Journey.findOne({ idJourney: id_Journey }).exec();

        if (!journey) {
            return res.status(404).json({ error: 'El viaje no existe' });
        }

        const ticket = req.body;
        ticket.journey = journey._id;

        const result = await Ticket.updateOne({ idTicket: req.params.id }, { $set: ticket });
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar el boleto' });
    }
};

exports.deleteTicket = async (req, res) => {
    try {
        // Ya no actualizamos los asientos aquí
        const result = await Ticket.deleteOne({ idTicket: req.params.id });
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: 'Error al eliminar el boleto' });
    }
};


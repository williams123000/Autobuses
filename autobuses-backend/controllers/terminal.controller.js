const Terminal = require('../models/terminal.model');
const Bus = require('../models/bus.model');
const Driver = require('../models/driver.model');
const Journey = require('../models/journey.model');

exports.createTerminal = async (req, res) => {
    try {
        const terminal = new Terminal(req.body);
        if (!terminal.idTerminal || !terminal.state || !terminal.address) {
            return res.status(400).json({ message: 'Faltan datos obligatorios' });
        }
        if (terminal.idTerminal < 1) {
            return res.status(400).json({ message: 'El ID de la terminal debe ser mayor a 0' });
        }
        const result = await terminal.save();
        res.status(202).json(result);
    } catch (error) {
        res.status(400).json({ message: 'Error al guardar la terminal (Ya existe esa terminal con el mismo id)' });
    }
};

exports.getTerminals = async (req, res) => {
    try {
        const result = await Terminal.find();
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: 'Error al obtener las terminales' });
    }
};

exports.getTerminalById = async (req, res) => {
    try {
        const result = await Terminal.findOne({ idTerminal: req.params.id });
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: 'Error al obtener la terminal' });
    }
};

exports.updateTerminal = async (req, res) => {
    try {
        const result = await Terminal.updateOne({ idTerminal: req.params.id }, { $set: req.body });
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar la terminal' });
    }
};

exports.deleteTerminal = async (req, res) => {
    try {
        const terminal = await Terminal.findOne({ idTerminal: req.params.id });
        if (!terminal) {
            return res.status(404).json({ message: 'La terminal no existe' });
        }

        const busesAsociados = await Bus.find({ terminal: terminal._id });
        if (busesAsociados.length > 0) {
            return res.status(400).json({
                message: 'No se puede eliminar la terminal porque tiene autobuses asociados',
            });
        }

        const driversAsociados = await Driver.find({ terminal: terminal._id });
        if (driversAsociados.length > 0) {
            return res.status(400).json({
                message: 'No se puede eliminar la terminal porque tiene conductores asociados',
            });
        }

        const journeysAsociados = await Journey.find({ origin: terminal._id });
        const journeysAsociados2 = await Journey.find({ destination: terminal._id });
        if (journeysAsociados.length > 0) {
            return res.status(400).json({
                message: 'No se puede eliminar la terminal porque tiene viajes asociados',
            });
        }
        if (journeysAsociados2.length > 0) {
            return res.status(400).json({
                message: 'No se puede eliminar la terminal porque tiene viajes asociados',
            });
        }
        

        const result = await Terminal.deleteOne({ idTerminal: req.params.id });
        res.status(200).json({ message: 'Terminal eliminada exitosamente', result });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la terminal', error });
    }
};
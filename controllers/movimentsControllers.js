const { validationResult } = require('express-validator');
const Movement = require('../models/Movimiento');
const Wallet = require('../models/Billetera');

exports.createMovement = async (req, res) => {
const errors = validationResult(req);
if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
}

const { descripcion, montoMoneda, tipo, movReferencia, billeteraId } = req.body;

try {
    const wallet = await Wallet.findById(billeteraId);
    if (!wallet) {
    return res.status(404).json({ msg: 'Billetera no encontrada' });
    }

    const newMovement = new Movement({
    descripcion,
    billetera: billeteraId,
    montoMoneda,
    tipo,
    movReferencia
    });

    const movement = await newMovement.save();

    // Actualizar saldo de la billetera
    if (tipo === 'Ingreso') {
    wallet.saldo += montoMoneda;
    } else if (tipo === 'Egreso') {
    wallet.saldo -= montoMoneda;
    }

    await wallet.save();

    res.json(movement);
} catch (err) {
    console.error('Error al crear movimiento:', err);
    res.status(500).send('Server Error');
}
};

exports.getMovements = async (req, res) => {
try {
    const movements = await Movement.find({ billetera: req.params.billeteraId }).sort({ createdAt: -1 });
    res.json(movements);
} catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
}
};
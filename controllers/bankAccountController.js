const { validationResult } = require('express-validator');
const BankAccount = require('../models/CuentaBanco');

exports.createBankAccount = async (req, res) => {
const errors = validationResult(req);
if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
}

const { nroCuenta, nombre, documento, banco, moneda } = req.body;

try {
    const newBankAccount = new BankAccount({
    nroCuenta,
    nombre,
    documento,
    banco,
    moneda,
    usuario: req.user.id
    });

    const bankAccount = await newBankAccount.save();
    res.json(bankAccount);
} catch (err) {
    console.error('Error al crear cuenta bancaria:', err);
    res.status(500).send('Server Error');
}
};

exports.getBankAccounts = async (req, res) => {
try {
    const bankAccounts = await BankAccount.find({ usuario: req.user.id });
    res.json(bankAccounts);
} catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
}
};

exports.deleteBankAccount = async (req, res) => {
try {
    const bankAccount = await BankAccount.findById(req.params.id);
    if (!bankAccount) {
    return res.status(404).json({ msg: 'Cuenta bancaria no encontrada' });
    }

    // Asegúrate de que el usuario es el propietario de la cuenta bancaria
    if (bankAccount.usuario.toString() !== req.user.id) {
    return res.status(401).json({ msg: 'No autorizado' });
    }

    await bankAccount.remove();
    res.json({ msg: 'Cuenta bancaria eliminada' });
} catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
}
};
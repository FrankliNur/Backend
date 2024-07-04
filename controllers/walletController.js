const { validationResult } = require('express-validator');
const Wallet = require('../models/Billetera');
const Moneda = require('../models/Moneda');
const User = require('../models/User');

exports.getWallets = async (req, res) => {
  try {
    const wallets = await Wallet.find({ usuario: req.user.id }).populate('moneda', ['nombre', 'valorUsd']);
    res.json(wallets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.createWallet = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  console.log('Usuario en createWallet:', req.user);

  const { moneda, saldo, codigo } = req.body;

  try {
    const monedaDoc = await Moneda.findOne({ nombre: moneda });
    if (!monedaDoc) {
      return res.status(400).json({ msg: 'Moneda no encontrada' });
    }

    const newWallet = new Wallet({
      usuario: req.user.id,
      moneda: monedaDoc._id,
      saldo,
      codigo
    });

    const wallet = await newWallet.save();
    res.json(wallet);
  } catch (err) {
    console.error('Error al crear billetera:', err);
    res.status(500).send('Server Error');
  }
};
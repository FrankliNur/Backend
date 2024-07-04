const { validationResult } = require('express-validator');
const Sale = require('../models/Venta');
const Wallet = require('../models/Billetera');

exports.createSale = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { moneda, valorVenta, montoMoneda, billeteraOrigen, metodoPago } = req.body;

  try {
    const wallet = await Wallet.findById(billeteraOrigen);
    if (!wallet) {
      return res.status(404).json({ msg: 'Billetera no encontrada' });
    }

    const newSale = new Sale({
      moneda,
      valorVenta,
      montoMoneda,
      billeteraOrigen,
      metodoPago,
      usuario: req.user.id
    });

    const sale = await newSale.save();
    res.json(sale);
  } catch (err) {
    console.error('Error al crear venta:', err);
    res.status(500).send('Server Error');
  }
};

exports.getSales = async (req, res) => {
  try {
    const sales = await Sale.find({ estado: 'Pendiente' }).populate('moneda', ['nombre', 'valorUsd']).populate('billeteraOrigen', ['codigo']);
    res.json(sales);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updateSaleStatus = async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id);
    if (!sale) {
      return res.status(404).json({ msg: 'Venta no encontrada' });
    }

    // Asegúrate de que el usuario es el propietario de la venta
    if (sale.usuario.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'No autorizado' });
    }

    sale.estado = req.body.estado;
    await sale.save();
    res.json(sale);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
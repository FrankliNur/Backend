 const { validationResult } = require('express-validator');
const Movement = require('../models/Movimiento');
const Wallet = require('../models/Billetera');

exports.transfer = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { billeteraOrigen, billeteraDestino, montoMoneda, descripcion } = req.body;

  try {
    const walletOrigen = await Wallet.findById(billeteraOrigen);
    const walletDestino = await Wallet.findById(billeteraDestino);

    if (!walletOrigen || !walletDestino) {
      return res.status(404).json({ msg: 'Billetera no encontrada' });
    }

    if (walletOrigen.saldo < montoMoneda) {
      return res.status(400).json({ msg: 'Saldo insuficiente en la billetera de origen' });
    }

    // Registrar movimientos
    const movementEgreso = new Movement({
      descripcion: descripcion || 'Transferencia realizada',
      billetera: billeteraOrigen,
      montoMoneda,
      tipo: 'Egreso'
    });

    const movementIngreso = new Movement({
      descripcion: descripcion || 'Transferencia recibida',
      billetera: billeteraDestino,
      montoMoneda,
      tipo: 'Ingreso'
    });

    await movementEgreso.save();
    await movementIngreso.save();

    // Actualizar saldos de las billeteras
    walletOrigen.saldo -= montoMoneda;
    walletDestino.saldo += montoMoneda;

    await walletOrigen.save();
    await walletDestino.save();

    res.json({ msg: 'Transferencia realizada exitosamente' });
  } catch (err) {
    console.error('Error al realizar la transferencia:', err);
    res.status(500).send('Server Error');
  }
};
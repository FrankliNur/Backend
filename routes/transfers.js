const express = require('express');
const { check } = require('express-validator');
const auth = require('../middleware/auth');
const transferController = require('../controllers/transferController');
const router = express.Router();

// Realizar una transferencia
router.post(
  '/',
  [
    auth,
    [
      check('billeteraOrigen', 'Billetera de origen es requerida').not().isEmpty(),
      check('billeteraDestino', 'Billetera de destino es requerida').not().isEmpty(),
      check('montoMoneda', 'Monto en moneda es requerido').isNumeric()
    ]
  ],
  transferController.transfer
);

module.exports = router;
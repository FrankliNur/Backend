const express = require('express');
const { check } = require('express-validator');
const auth = require('../middleware/auth');
const movementController = require('../controllers/movimentsControllers');
const router = express.Router();

// Obtener todos los movimientos de una billetera
router.get('/:billeteraId', auth, movementController.getMovements);

// Crear un nuevo movimiento
router.post(
  '/',
  [
    auth,
    [
      check('descripcion', 'Descripción es requerida').not().isEmpty(),
      check('montoMoneda', 'Monto de moneda es requerido').isNumeric(),
      check('tipo', 'Tipo es requerido').isIn(['Ingreso', 'Egreso']),
      check('billeteraId', 'Billetera ID es requerido').not().isEmpty()
    ]
  ],
  movementController.createMovement
);

module.exports = router;
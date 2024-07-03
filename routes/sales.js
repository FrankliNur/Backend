const express = require('express');
const { check } = require('express-validator');
const auth = require('../middleware/auth');
const saleController = require('../controllers/salesController');
const router = express.Router();

// Obtener todas las ventas pendientes
router.get('/', auth, saleController.getSales);

// Crear una nueva venta
router.post(
  '/',
  [
    auth,
    [
      check('moneda', 'Moneda es requerida').not().isEmpty(),
      check('valorVenta', 'Valor de venta es requerido').isNumeric(),
      check('montoMoneda', 'Monto en moneda es requerido').isNumeric(),
      check('billeteraOrigen', 'Billetera de origen es requerida').not().isEmpty(),
      check('metodoPago', 'Método de pago es requerido').not().isEmpty()
    ]
  ],
  saleController.createSale
);

// Actualizar el estado de una venta
router.put('/:id', auth, saleController.updateSaleStatus);

module.exports = router;
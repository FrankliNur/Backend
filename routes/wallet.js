const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const walletController = require('../controllers/walletController');
const router = express.Router();

// Obtener todas las billeteras del usuario autenticado
router.get('/', auth, walletController.getWallets);

// Crear una nueva billetera
router.post(
'/',
[
    auth,
    [
    check('moneda', 'Moneda es requerida').not().isEmpty(),
    check('codigo', 'Código es requerido').not().isEmpty()
    ]
],
walletController.createWallet
);

module.exports = router;
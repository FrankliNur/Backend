const express = require('express');
const { check } = require('express-validator');
const auth = require('../middleware/auth');
const bankAccountController = require('../controllers/bankAccountController');
const router = express.Router();

// Obtener todas las cuentas bancarias del usuario autenticado
router.get('/', auth, bankAccountController.getBankAccounts);

// Crear una nueva cuenta bancaria
router.post(
'/',
[
    auth,
    [
    check('nroCuenta', 'Número de cuenta es requerido').not().isEmpty(),
    check('nombre', 'Nombre es requerido').not().isEmpty(),
    check('documento', 'Documento es requerido').not().isEmpty(),
    check('banco', 'Banco es requerido').not().isEmpty(),
    check('moneda', 'Moneda es requerida').not().isEmpty()
    ]
],
bankAccountController.createBankAccount
);

// Eliminar una cuenta bancaria
router.delete('/:id', auth, bankAccountController.deleteBankAccount);

module.exports = router;
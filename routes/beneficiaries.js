
const express = require('express');
const { check } = require('express-validator');
const auth = require('../middleware/auth');
const beneficiaryController = require('../controllers/beneficiaryController');
const router = express.Router();

// Obtener todos los beneficiarios del usuario autenticado
router.get('/', auth, beneficiaryController.getBeneficiaries);

// Crear un nuevo beneficiario
router.post(
  '/',
  [
    auth,
    [
      check('nombreReferencia', 'Nombre de referencia es requerido').not().isEmpty(),
      check('nroCuenta', 'Número de cuenta es requerido').not().isEmpty()
    ]
  ],
  beneficiaryController.createBeneficiary
);

// Eliminar un beneficiario
router.delete('/:id', auth, beneficiaryController.deleteBeneficiary);

module.exports = router;
const express = require('express');
const { check } = require('express-validator');
const auth = require('../middleware/auth');
const cardController = require('../controllers/cardController');
const router = express.Router();

// Obtener todas las tarjetas del usuario autenticado
router.get('/', auth, cardController.getCards);

// Crear una nueva tarjeta
router.post(
'/',
[
    auth,
    [
    check('nombre', 'Nombre es requerido').not().isEmpty(),
    check('numero', 'Número es requerido').isCreditCard(),
    check('cvv', 'CVV es requerido').isLength({ min: 3, max: 4 }),
    check('fechaVenc', 'Fecha de vencimiento es requerida').not().isEmpty()
    ]
],
cardController.createCard
);

// Eliminar una tarjeta
router.delete('/:id', auth, cardController.deleteCard);

module.exports = router;
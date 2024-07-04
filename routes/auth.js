const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth')
const router = express.Router();

router.post('/register', [
body('nombre').notEmpty().withMessage('Nombre es requerido'),
body('email').isEmail().withMessage('Por favor incluya un email válido'),
body('contraseña').isLength({ min: 4 }).withMessage('La contraseña debe tener al menos 6 caracteres')
], authController.register);

router.post('/login', [
body('email').isEmail().withMessage('Por favor incluya un email válido'),
body('contraseña').exists().withMessage('La contraseña es requerida')
], authController.login);

router.get('/me', auth, authController.getMe);

module.exports = router;
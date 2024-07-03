const express = require('express');
const router = express.Router();

// Importar las rutas
const authRoutes = require('./auth');
const walletRoutes = require('./wallet');
const movimentsRoutes = require('./moviments');
const cardRoutes = require('./cards');
const bancoAcountsRoutes = require('./bankAccounts');
const salesRoutes = require('./sales');
const beneficiarioRoutes = require('./beneficiaries');
const transferenciaRoutes = require('./transfers');
// Usar las rutas
router.use('/auth', authRoutes);
router.use('/wallets', walletRoutes);
router.use('/moviment', movimentsRoutes);
router.use('/card',cardRoutes);
router.use('/bankAccounts',bancoAcountsRoutes);
router.use('/sales',salesRoutes);
router.use('/beneficiario',beneficiarioRoutes);
router.use('/transfers', transferenciaRoutes);
module.exports = router;
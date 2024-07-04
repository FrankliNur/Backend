

const { validationResult } = require('express-validator');
const Beneficiary = require('../models/Beneficiario');

exports.createBeneficiary = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { nombreReferencia, nroCuenta } = req.body;

  try {
    const newBeneficiary = new Beneficiary({
      nombreReferencia,
      nroCuenta,
      usuario: req.user.id
    });

    const beneficiary = await newBeneficiary.save();
    res.json(beneficiary);
  } catch (err) {
    console.error('Error al crear beneficiario:', err);
    res.status(500).send('Server Error');
  }
};

exports.getBeneficiaries = async (req, res) => {
  try {
    const beneficiaries = await Beneficiary.find({ usuario: req.user.id });
    res.json(beneficiaries);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.deleteBeneficiary = async (req, res) => {
  try {
    const beneficiary = await Beneficiary.findById(req.params.id);
    if (!beneficiary) {
      return res.status(404).json({ msg: 'Beneficiario no encontrado' });
    }

    // Asegúrate de que el usuario es el propietario del beneficiario
    if (beneficiary.usuario.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'No autorizado' });
    }

    await beneficiary.remove();
    res.json({ msg: 'Beneficiario eliminado' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
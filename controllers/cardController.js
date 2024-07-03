const { validationResult } = require('express-validator');
const Card = require('../models/Tarjeta');

exports.createCard = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { nombre, numero, cvv, fechaVenc } = req.body;

  try {
    const newCard = new Card({
      nombre,
      numero,
      cvv,
      fechaVenc,
      usuario: req.user.id
    });

    const card = await newCard.save();
    res.json(card);
  } catch (err) {
    console.error('Error al crear tarjeta:', err);
    res.status(500).send('Server Error');
  }
};

exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find({ usuario: req.user.id });
    res.json(cards);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.deleteCard = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) {
      return res.status(404).json({ msg: 'Tarjeta no encontrada' });
    }

    // Asegúrate de que el usuario es el propietario de la tarjeta
    if (card.usuario.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'No autorizado' });
    }

    await card.remove();
    res.json({ msg: 'Tarjeta eliminada' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
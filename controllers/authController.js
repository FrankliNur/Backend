const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { validationResult } = require('express-validator');

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { nombre, email, contraseña, esAdmin } = req.body;

  try {
    let usuario = await User.findOne({ email });

    if (usuario) {
      return res.status(400).json({ msg: 'El usuario ya existe' });
    }

    usuario = new User({
      nombre,
      email,
      contraseña,
      esAdmin
    });

    const salt = await bcrypt.genSalt(10);
    usuario.contraseña = await bcrypt.hash(contraseña, salt);

    await usuario.save();

    const payload = {
      user: {
        id: usuario.id,
        esAdmin: usuario.esAdmin
      }
    };

    jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: 360000
    }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.login = async (req, res) => {
  console.log(req.body); // Verificar el payload recibido
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, contraseña } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Credenciales inválidas' });
    }

    console.log('Contraseña del usuario:', user.contraseña); // Verificar la contraseña del usuario

    const isMatch = await bcrypt.compare(contraseña, user.contraseña);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Credenciales inválidas' });
    }

    const payload = {
      user: {
        id: user.id,
        esAdmin: user.esAdmin,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '5h' },
      (err, token) => {
        if (err) throw err;
        console.log({ token, user: payload.user }); // Imprimir la respuesta antes de enviarla
        res.json({ token, user: payload.user });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-contraseña');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
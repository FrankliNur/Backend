const mongoose = require('mongoose');
const Moneda = require('./models/Moneda');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    const monedas = [
      { nombre: 'Bitcoin', valorUsd: 35000 },
      { nombre: 'Ethereum', valorUsd: 2000 }
    ];

    await Moneda.insertMany(monedas);
    console.log('Monedas insertadas');
    process.exit(0);
  } catch (err) {
    console.error('Error al insertar monedas:', err);
    process.exit(1);
  }
};

connectDB();
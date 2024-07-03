const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CurrencySchema = new Schema({
  nombre: { type: String, required: true },
  valorUsd: { type: Number, required: true }
});

module.exports = mongoose.model('Moneda', CurrencySchema);
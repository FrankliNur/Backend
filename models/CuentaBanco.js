const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BankAccountSchema = new Schema({
  nroCuenta: { type: String, required: true },
  nombre: { type: String, required: true },
  documento: { type: String, required: true },
  banco: { type: String, required: true },
  moneda: { type: Schema.Types.ObjectId, ref: 'Moneda', required: true },
  usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true }
});

module.exports = mongoose.model('CuentaBanco', BankAccountSchema);
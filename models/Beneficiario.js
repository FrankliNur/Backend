const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BeneficiarySchema = new Schema({
  nombreReferencia: { type: String, required: true },
  nroCuenta: { type: String, required: true },
  usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true }
});

module.exports = mongoose.model('Beneficiario', BeneficiarySchema);
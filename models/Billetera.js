const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WalletSchema = new Schema({
  usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
  moneda: { type: Schema.Types.ObjectId, ref: 'Moneda', required: true },
  saldo: { type: Number, default: 0 },
  codigo: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('Billetera', WalletSchema);
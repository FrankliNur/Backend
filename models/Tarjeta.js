const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSchema = new Schema({
  nombre: { type: String, required: true },
  numero: { type: String, required: true },
  cvv: { type: String, required: true },
  fechaVenc: { type: Date, required: true },
  usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true }
});

module.exports = mongoose.model('Tarjeta', CardSchema);
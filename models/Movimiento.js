const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovementSchema = new Schema({
  descripcion: { type: String, required: true },
  billetera: { type: Schema.Types.ObjectId, ref: 'Billetera', require: true },
  montoMoneda: { type: Number, required: true },
  tipo: { type: String, enum: ['Ingreso', 'Egreso'], required: true },
  movReferencia: { type: Schema.Types.ObjectId, ref: 'Movimiento', default: null }
});

module.exports = mongoose.model('Movimiento', MovementSchema);
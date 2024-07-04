const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SaleSchema = new Schema({
  moneda: { type: Schema.Types.ObjectId, ref: 'Moneda', required: true },
  valorVenta: { type: Number, required: true },
  montoMoneda: { type: Number, required: true },
  billeteraOrigen: { type: Schema.Types.ObjectId, ref: 'Billetera', required: true },
  //billeteraDestino: { type: Schema.Types.ObjectId, ref: 'Billetera', default: null },
  metodoPago: { type: String, required: true },
  estado: { type: String, enum: ['Pendiente', 'En Validacion', 'Vendido'], default: 'Pendiente' },
  usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true }
});

module.exports = mongoose.model('Venta', SaleSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
nombre: { type: String, required: true },
email: { type: String, required: true, unique: true },
contraseña: { type: String, required: true },
esAdmin: { type: Boolean, default: false }
});

module.exports = mongoose.model('Usuario', UserSchema);
const mongoose = require('mongoose');
const { Schema } = mongoose;

const MedidaSchema = new Schema({
    email: { type: String, required: false },
    password: { type: String, required: false },
    nameSensor: { type: String, required: true },
    temp: { type: Number, required: true },
    hum: { type: Number, required: true },
    date: { type: Date, default: Date.now}
});

module.exports = mongoose.model('Medida', MedidaSchema);
const mongoose = require("mongoose");
const { format } = require("date-fns");
const formatoDate = require("../middlewares/formatoDate");
const calcularTiempoTranscurrido = require("../middlewares/tiempoTranscurrido");

const vehiculoSchema = new mongoose.Schema({
  placa: {
    type: String,
    required: true,
    unique: true,
  },
  tipo: {
    type: String,
    enum: ["Carro", "Moto"],
    required: true,
  },
  horaEntrada: {
    type: String,
    default: () => format(new Date(), "yyyy-MM-dd HH:mm"),
  },
  horaSalida: {
    type: String,
    default: null,
  },
  tiempo: {
    type: Number,
    default: 0,
  },
});

formatoDate(vehiculoSchema);
calcularTiempoTranscurrido(vehiculoSchema);

const Vehiculo = mongoose.model("vehiculos", vehiculoSchema);

module.exports = Vehiculo;

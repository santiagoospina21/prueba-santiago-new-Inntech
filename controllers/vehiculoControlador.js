const Vehiculo = require("../models/vehiculo");
const { MAX_CARROS, MAX_MOTOS } = require("../config/variables");

exports.seleccionarVehiculos = async (req, res) => {
  try {
    const vehiculos = await Vehiculo.find();
    res.status(200).json({ vehiculos });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};

exports.seleccionarVehiculo = async (req, res) => {
  try {
    const { id } = req.params;
    const vehiculo = await Vehiculo.findById(id);
    if (!id || !vehiculo) {
      return res.status(404).json({ message: "Vehiculo no encontrado" });
    }
    res.status(200).json({ message: "Vehiculo encontrado", vehiculo });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};

exports.seleccionarCarros = async (req, res) => {
  try {
    const vehiculos = await Vehiculo.find({ tipo: "Carro" });
    if (!vehiculos || vehiculos.length === 0) {
      return res.status(404).json({ message: "Vehiculos no encontrados" });
    }
    res.status(200).json({ vehiculos });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};

exports.seleccionarMotos = async (req, res) => {
  try {
    const vehiculos = await Vehiculo.find({ tipo: "Moto" });
    if (!vehiculos || vehiculos.length === 0) {
      return res.status(404).json({ message: "Vehiculos no encontrados" });
    }
    res.status(200).json({ vehiculos });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};
exports.agregarVehiculo = async (req, res) => {
  try {
    const { placa, tipo } = req.body;
    const numeroCarros = await Vehiculo.countDocuments({ tipo: "Carro" });
    const numeroMotos = await Vehiculo.countDocuments({ tipo: "Moto" });

    if (
      (tipo === "Carro" && numeroCarros >= MAX_CARROS) ||
      (tipo === "Moto" && numeroMotos >= MAX_MOTOS)
    ) {
      return res.status(400).json({
        message: `No hay mas espacios en el parqueadero para ${tipo}s`,
      });
    }
    const nuevoVehiculo = new Vehiculo({ placa, tipo });
    await nuevoVehiculo.save();
    res.status(201).json({
      message: "Vehiculo agregado al parqueadero",
      vehiculo: nuevoVehiculo,
    });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};

exports.actualizarVehiculo = async (req, res) => {
  try {
    const { id } = req.params;
    const { placa, tipo, horaSalida } = req.body;

    if (!placa && !tipo && !horaSalida) {
      return res.status(400).json({
        message:
          "Se requiere por lo menos la placa, el tipo o la hora de salida.",
      });
    }

    const vehiculo = await Vehiculo.findByIdAndUpdate(
      id,
      {
        placa,
        tipo,
        horaSalida,
      },
      { new: true }
    );

    if (!vehiculo) {
      return res.status(404).json({ message: "Vehiculo no encontrado" });
    }

    if (horaSalida) {
      const dias = Math.floor(vehiculo.tiempo / 1440);
      const horas = Math.floor((vehiculo.tiempo % 1440) / 60);
      const minutos = vehiculo.tiempo % 60;
      res.status(200).json({
        message: `El tiempo ${
          vehiculo.tipo === "Carro" ? "del carro" : "de la moto"
        } con placas ${
          vehiculo.placa
        } en el parquedero fue de: ${dias} dias ${horas} horas ${minutos} minutos`,
        vehiculo,
      });
    } else {
      res.status(200).json({ message: "Vehiculo actualizado", vehiculo });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};

exports.eliminarVehiculo = async (req, res) => {
  try {
    const { id } = req.params;
    const vehiculo = await Vehiculo.findByIdAndDelete(id);
    if (!vehiculo) {
      return res.status(404).json({ message: "Vehiculo no encontrado" });
    }
    res.status(200).json({ message: "Vehiculo eliminado", vehiculo });
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor", error });
  }
};

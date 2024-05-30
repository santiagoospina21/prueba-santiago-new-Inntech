const calcularTiempoTranscurrido = (schema) => {
  schema.pre("findOneAndUpdate", async function (next) {
    this.options.new = true;
    this.options.runValidators = true;
    next();
  });

  schema.post("findOneAndUpdate", async function (doc) {
    if (doc && doc.horaSalida) {
      const [fechaEntrada, horaEntrada] = doc.horaEntrada.split(" ");
      const [fechaSalida, horaSalida] = doc.horaSalida.split(" ");

      const [yearSalida, mesSalida, diaSalida] = fechaSalida
        .split("-")
        .map(Number);
      const [yearEntrada, mesEntrada, diaEntrada] = fechaEntrada
        .split("-")
        .map(Number);

      const [horasSalida, minutosSalida] = horaSalida.split(":").map(Number);
      const [horasEntrada, minutosEntrada] = horaEntrada.split(":").map(Number);

      const fechaSalidaFormat = new Date(
        yearSalida,
        mesSalida - 1,
        diaSalida,
        horasSalida,
        minutosSalida
      );
      const fechaEntradaFormat = new Date(
        yearEntrada,
        mesEntrada - 1,
        diaEntrada,
        horasEntrada,
        minutosEntrada
      );

      const tiempoTranscurrido = Math.floor(
        (fechaSalidaFormat - fechaEntradaFormat) / 60000
      );

      doc.tiempo = tiempoTranscurrido;
      await doc.save();

      console.log(
        "Tiempo transcurrido en el parqueadero: " + doc.tiempo + " minutos"
      );
    }
  });
};

module.exports = calcularTiempoTranscurrido;

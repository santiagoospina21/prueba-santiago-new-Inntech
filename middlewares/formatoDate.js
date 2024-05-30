const { format } = require("date-fns");

const formatoDate = (schema) => {
  schema.pre("save", (next) => {
    const fecha = new Date();
    this.horaEntrada = format(fecha, "yyyy-MM-dd HH:mm");
    if (this.horaSalida) {
      this.horaSalida = format(fecha, "yyyy-MM-dd HH:mm");
    }
    next();
  });
};

module.exports = formatoDate;

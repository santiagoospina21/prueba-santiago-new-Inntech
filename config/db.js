const mongoose = require("mongoose");

const dbURI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/prueba";

mongoose
  .connect(dbURI)
  .then(() => console.log(`Conectado a la base de datos en: ${dbURI}`))
  .catch((err) =>
    console.error(`Error de conexión en la base de datos: ${err}`)
  );

mongoose.connection.on("disconnected", () => {
  console.log("La base de datos se ha cerrado");
});

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log(
      "La base de datos se ha cerrado debido a la terminación de la aplicación"
    );
    process.exit(0);
  });
});

module.exports = mongoose.connection;

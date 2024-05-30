const express = require("express");
const morgan = require("morgan");

const mongooseConection = require("./config/db");
const vehiculosRoute = require("./routes/vehiculosRoute");
const swaggerDocs = require("./swagger");
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use("/api", vehiculosRoute);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
  swaggerDocs(app, PORT);
});

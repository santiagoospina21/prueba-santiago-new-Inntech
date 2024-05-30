const express = require("express");
const router = express.Router();
const {
  seleccionarVehiculos,
  seleccionarVehiculo,
  seleccionarCarros,
  seleccionarMotos,
  agregarVehiculo,
  actualizarVehiculo,
  eliminarVehiculo,
} = require("../controllers/vehiculoControlador");

/**
 * @swagger
 * /api/vehiculos:
 *   get:
 *     summary: Obtiene todos los vehículos
 *     responses:
 *       200:
 *         description: Lista de vehículos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   placa:
 *                     type: string
 *                   tipo:
 *                     type: string
 *                   horaEntrada:
 *                     type: string
 *                   horaSalida:
 *                     type: string
 *                   tiempo:
 *                     type: integer
 *       500:
 *         description: Error en el servidor
 */

router.get("/vehiculos", seleccionarVehiculos);

/**
 * @swagger
 * /api/vehiculos/carros:
 *   get:
 *     summary: Obtiene todos los carros
 *     responses:
 *       200:
 *         description: Lista de carros
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   placa:
 *                     type: string
 *                   tipo:
 *                     type: string
 *                   horaEntrada:
 *                     type: string
 *                   horaSalida:
 *                     type: string
 *                   tiempo:
 *                     type: integer
 *       500:
 *         description: Error en el servidor
 */

router.get("/vehiculos/carros", seleccionarCarros);

/**
 * @swagger
 * /api/vehiculos/motos:
 *   get:
 *     summary: Obtiene todas las motos
 *     responses:
 *       200:
 *         description: Lista de motos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   placa:
 *                     type: string
 *                   tipo:
 *                     type: string
 *                   horaEntrada:
 *                     type: string
 *                   horaSalida:
 *                     type: string
 *                   tiempo:
 *                     type: integer
 *       500:
 *         description: Error en el servidor
 */

router.get("/vehiculos/motos", seleccionarMotos);

/**
 * @swagger
 * /api/vehiculos/{id}:
 *   get:
 *     summary: Obtiene un vehículo por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del vehículo
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Vehículo encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 placa:
 *                   type: string
 *                 tipo:
 *                   type: string
 *                 horaEntrada:
 *                   type: string
 *                 horaSalida:
 *                   type: string
 *                 tiempo:
 *                   type: integer
 *       404:
 *         description: Vehículo no encontrado
 *       500:
 *         description: Error en el servidor
 */

router.get("/vehiculos/:id", seleccionarVehiculo);

/**
 * @swagger
 * /api/agregarvehiculo:
 *   post:
 *     summary: Agrega un nuevo vehículo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - placa
 *               - tipo
 *             properties:
 *               placa:
 *                 type: string
 *               tipo:
 *                 type: string
 *     responses:
 *       201:
 *         description: Vehículo agregado al parqueadero
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 vehiculo:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     placa:
 *                       type: string
 *                     tipo:
 *                       type: string
 *                     horaEntrada:
 *                       type: string
 *                     horaSalida:
 *                       type: string
 *                     tiempo:
 *                       type: integer
 *       400:
 *         description: No hay más espacios en el parqueadero
 *       500:
 *         description: Error en el servidor
 */
router.post("/agregarvehiculo", agregarVehiculo);

/**
 * @swagger
 * /api/actualizarvehiculo/{id}:
 *   patch:
 *     summary: Actualiza un vehículo
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del vehículo
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               placa:
 *                 type: string
 *               tipo:
 *                 type: string
 *               horaSalida:
 *                 type: string
 *     responses:
 *       200:
 *         description: Vehículo actualizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 vehiculo:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     placa:
 *                       type: string
 *                     tipo:
 *                       type: string
 *                     horaEntrada:
 *                       type: string
 *                     horaSalida:
 *                       type: string
 *                     tiempo:
 *                       type: integer
 *       400:
 *         description: Se requiere por lo menos la placa, el tipo o la hora de salida
 *       404:
 *         description: Vehículo no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.patch("/actualizarvehiculo/:id", actualizarVehiculo);

/**
 * @swagger
 * /api/eliminarvehiculo/{id}:
 *   delete:
 *     summary: Elimina un vehículo
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del vehículo
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Vehículo eliminado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 vehiculo:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     placa:
 *                       type: string
 *                     tipo:
 *                       type: string
 *                     horaEntrada:
 *                       type: string
 *                     horaSalida:
 *                       type: string
 *                     tiempo:
 *                       type: integer
 *       404:
 *         description: Vehículo no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.delete("/eliminarvehiculo/:id", eliminarVehiculo);

module.exports = router;

# APP PARQUEADERO

## Descripción

API rest para gestionar un parqueadero que acepta solo motos y carros con un límite de 5 carros y 10 motos.

## Configuración

1. Clona el repositorio:

   - git clone https://github.com/santiagoospina21/prueba-santiago-new-Inntech.git

2. Crea un archivo .env en la raíz del proyecto y añade la URI de tu base de datos MongoDB:

- MONGO_URI= tu_dirección_de_base_de_datos

3. Instala las dependencias:

- npm install

4. Inicia el servidor:

- npm start

## Restaurar base de datos

1. Asegurate que tienes instalado MongoDB.

2. Ejecuta el comando en una terminal:

- mongorestore --uri "tu_dirección_de_base_de_datos" ./backup

- **NOTA**: (Asegúrese que en la carpeta ./backup esten los archivos, de no ser asi cambielo por la ruta donde esten los archivos y permita
  la ejecución del mongorestore)

-Ejemplo: mongorestore --uri "mongodb://127.0.0.1:27017/prueba-nueva" D:\Proyectos-Programacion\Prueba-tecnica-NewIntech-Santiago-Ospina\backup

## Endpoints

- `GET /api/vehiculos`: Obtiene todos los vehículos.

- `GET /api/vehiculos/:id`: Obtiene un vehículo de acuerdo a su ID.

- `GET /api/vehiculos/carros`: Obtiene todos los carros.

- `GET /api/vehiculos/motos`: Obtiene todas las motos.

- `POST /api/agregarvehiculo`: Crea un nuevo vehículo.

- `PATCH /api/actualizarvehiculo/:id`: Actualiza un vehículo.

- `DELETE /api/eliminarvehiculo/:id`: Elimina un vehículo.

## Consideraciones

1. Para agregar un vehículo nuevo (POST), el tipo debe ser extrictamente "Carro" o "Moto".

2. Cuando actualice un vehículo (PATCH), puede actualizar solo la placa, el tipo o la horaSalida, pero minimanente uno de estos tres.

3. En la actualización del vehículo con la horaSalida, esta debe estar en formato : "yyyy-MM-dd HH:mm"

4. El tiempo de cada registro esta en minutos y solo se calculará una vez se ingrese una horaSalida.

## Postman

Se incluye un archivo `API Parqueadero.postman_collection.json` en `./postman` el cual puedes importar en Postman.

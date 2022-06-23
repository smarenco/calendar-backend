/*
    instalamos npm nodemon -g (-g para que se instale globalmente en la maquina) eso permite ejecutar el archivo que seleccionemos y cuando guardemos se actualice en la consola.
    pero en package.json configuramos 
    "scripts": {
    "dev": "nodemon index.js",
    "start": "node index.js"
  },
  para que se ejecute automaticamente en dev y en prod se ejecuta start.
  con el comando npm run dev o si quiero simular lo que seria produccion seria npm start.

  luego instalamos npm i express@4.18.1
  luego instalamos  npm i dotenv para manejar las variables de entorno
  con process.env.xxx acceso a todas las variables de entorno

  npm i express-validator

  instalamos npm i mongoose para poder coinectarno a una bd de mongo, en database/config se hace la conexion.
  npm i bcryptjs para encriptar la contasenia

  npm i cors se instala este paquete para controlar desde donde se puede invocar este servicio, se puede restringir o habilitar a todos.

  Importante hay que instalar heroku https://devcenter.heroku.com/articles/heroku-cli#install-the-heroku-cli
*/

const express = require('express');
const { dbConnection } = require('./database/config');
var cors = require('cors')
require('dotenv').config();

//Crear el servidor de express
const app = express();

//Base de datos
dbConnection();

//CORS
app.use(cors());

//Directorio publico
app.use( express.static('public') );


//Lectura y parseo del body
app.use( express.json() );


//Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));
//CRUD EVENTOS





//Escuchar peticiones
app.listen( process.env.PORT , () => {
    console.log(`servidor corriendo en puerto ${ process.env.PORT }`);
});
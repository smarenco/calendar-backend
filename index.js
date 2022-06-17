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
*/

const express = require('express');

//Crear el servidor de express
const app = express();


//Rutas
app.get('/', (req, res) => {

    res.json({
        ok: true,
    })

})





//Escuchar peticiones
app.listen( 4000, () => {
    console.log(`servidor corriendo en puerto ${ 4000 }`);
});
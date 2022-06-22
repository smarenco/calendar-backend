/*
    Rutas de Eventos
    host + /api/events
*/


const { Router } = require('express');
const { check } = require('express-validator')
const router = Router();

const { getEventos, crearEvento, actualizarEventos, eliminarEventos } = require("../controllers/events");
const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middelwares/validar-campos');
const { validarJWT } = require("../middelwares/validar-jwt");

//Esto hace que se ejecute para todas las rutas que esten abajo de él, si pones una ruta arriba de esto, no se lo ejecuta 
router.use( validarJWT );

router.get('/',getEventos);

router.post(
    '/', 
    [
        check('title', 'El title es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'La fecha de finalizacion es obligatoria').custom( isDate ),
        validarCampos
    ], 
    crearEvento
);

router.put('/:id', actualizarEventos);

router.delete('/:id', eliminarEventos);


module.exports = router;
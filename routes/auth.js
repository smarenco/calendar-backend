/*
    Rutas de Usuarios
    host + /api/auth
*/


const { Router } = require('express');
const { check } = require('express-validator')
const router = Router();

const { crearUsuario, revalidarToken, loginUsuario } = require('../controllers/auth');


router.post(
    '/new', 
    [
        check('name', 'El name es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({min: 6}),

    ], 
    crearUsuario)

router.post(
    '/', 
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({min: 6}),

    ], 
    loginUsuario)

router.get('/renew', revalidarToken)

module.exports = router;
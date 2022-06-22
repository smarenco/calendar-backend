//Esto se importa para poder tener el tipado a la hora de escribir codigo res
const { response } = require('express')
const jwt = require('jsonwebtoken');

const validarJWT = (req, res = response, next) => {
    
    //x-token headers
    const token = req.header('x-token');
    if( !token ){
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la validacion'
        })
    }

    try {

        const { uid, name } = jwt.verify(
            token, 
            process.env.SECRET_JWT_SEED
        )

        //dado un token que se va a reavalidar, obtengo los datos del logueado y sigo al controller para generar otro token.
        req.uid = uid;
        req.name = name;


    } catch(err) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }

    next();

}

module.exports = {
    validarJWT
}

//const express = require('express');
const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async(req, res = response) => {

    const { name, email, password } = req.body;

    

    try{
        //let usuario = Usuario.findOne({ email: email });
        let usuario = await Usuario.findOne({ email });

        if( usuario ){
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario ya existe con ese correo'
            })
        }

        usuario = new Usuario(req.body);

        //Encriptar contrasenia
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(password, salt);

        await usuario.save();

        //Generar JWT
        const token = await generarJWT( usuario.id, usuario.name);

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });

    } catch(err) {
        console.error(err);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador',
        });
    }
}

const loginUsuario = async(req, res = response ) => {

    const { email, password } = req.body;

    try{
        const usuario = await Usuario.findOne({ email });

        if( !usuario ){
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario no existe con ese correo'
            })
        }

        //confirmar los passwords
        const validPassword = bcryptjs.compareSync(password, usuario.password)

        if( !validPassword ){
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            })
        }

        //Generar JWT
        const token = await generarJWT( usuario.id, usuario.name);


        res.status(200).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })

    } catch(err){
        console.error(err);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador',
        });
    }
    
}

const revalidarToken = async(req, res = response) => {

    const uid = req.uid;
    const name = req.name;

    console.log(uid)

    try {
        //Generar JWT
        const token = await generarJWT( uid, name);

        res.status(200).json({
            ok: true,
            uid,
            name,
            token
        })

    } catch(err){

        res.status(401).json({
            ok: false,
            msg: 'Error al generar el token'
        })
    }
}

module.exports = {
    loginUsuario,
    crearUsuario,
    revalidarToken,

}
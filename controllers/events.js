const { response } = require("express");
const Evento = require('../models/Evento');

const getEventos = async(req, res = response ) => {
    //con populate cargamos la foreigkey en este caso usuario por el atributo user, en el modelo esta referenciado a su tabla, 
    //solo le pido el name pero si quiero mas atributos seria 'name password' sin coma
    const eventos = await Evento.find()
                                .populate('user', 'name');

    res.status(200).json({ 
        ok: true,
        eventos
    });

}

const crearEvento = async(req, res = response ) => {

    const evento = new Evento(req.body);

    try {
        //req.uid se genera cuando se valida el token en la ruta se genera en req.uid y req.name
        evento.user = req.uid;

        const eventoGuardado = await evento.save();

        res.status(200).json({ 
            ok: true,
            evento: eventoGuardado
        });
    } catch (err) {
        res.status(500).json({ 
            ok: false,
            msg: "Hable con el administrador"
        });
    }
    

}

const actualizarEventos = async(req, res = response ) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        const evento = await Evento.findById(eventoId);

        if( !evento ){
            res.status(404).json({ 
                ok: false,
                msg: "El evento no existe por ese id"
            });
        }

        if( evento.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            });
        }

        const nuevoEvento = { ...req.body, user: uid};

        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, { new: true } );


        res.status(200).json({ 
            ok: true,
            msg: 'Update Eventos',
            evento: eventoActualizado
        });

    } catch (err) { 
        return res.status(500).json({ 
            ok: false, 
            msg: 'Hable con el administrador' 
        });
    }




}

const eliminarEventos = async(req, res = response ) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        const evento = await Evento.findById(eventoId);

        if( !evento ){
            res.status(404).json({ 
                ok: false,
                msg: "El evento no existe por ese id"
            });
        }

        if( evento.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            });
        }

        await Evento.findByIdAndDelete( eventoId );

        res.status(200).json({ 
            ok: true,
        });
    
    } catch (err) { 
        return res.status(500).json({ 
            ok: false, 
            msg: 'Hable con el administrador' 
        });
    }

    
}


module.exports = {
    getEventos,
    crearEvento,
    actualizarEventos,
    eliminarEventos
}
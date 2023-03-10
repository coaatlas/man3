

const { response } = require('express');
const Evento = require('../models/Events');





//================================================================================

const getEventos = async ( req, res =response ) => {

    const eventos = await Evento.find()
                                .populate('user', 'name');
                                

    res.json({
        ok : true,
        eventos
    });
}


//================================================================================
const crearEventos = async ( req, res =response ) => {

    const evento = new Evento( req.body );

    try {
        evento.user = req.uid;
        const eventoGuardado = await evento.save();
        res.json({
            ok : true,
            evento : eventoGuardado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok : false,
            msg : 'Hable con el administrador'
        });

    }
    
}
//================================================================================
const actualizarEvento = async ( req, res =response ) => {

    const eventoId = req.params.id;
   

    try {

        const evento = await Evento.findById( eventoId );

        if ( !evento ) {
            return res.status(404).json({
                ok : false,
                msg : 'Evento no existe por ese id'
            });
        }

        if ( evento.user.toString() !== req.uid ) {
            return res.status(401).json({
                ok : false,
                msg : 'No tiene privilegio de editar este evento,fue registrado por otro usuario'
            });
        }

        const nuevoEvento = {
            ...req.body,
            user : req.uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, { new : true } );

        res.json({
            ok : true,
            evento : eventoActualizado
        });

                
    }
        
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok : false,
            msg : 'Hable con el administrador'
        });

    }

}

//================================================================================

const borrarEvento = async ( req, res =response ) => {

    const eventoId = req.params.id;

    try {

        const evento = await Evento.findById( eventoId );
        if ( !evento ) {
            return res.status(404).json({
                ok : false,
                msg : 'Evento no existe por ese id'
            });
        }

        if ( evento.user.toString() !== req.uid ) {
            return res.status(401).json({
                ok : false,
                msg : 'No tiene privilegio de eliminar este evento, fue registrado por otro usuario'
            });
        }
        await Evento.findByIdAndDelete( eventoId );

        res.json({
            ok : true,
            msg : 'Evento eliminado'
        });
    }

    catch (error) {
        console.log(error);
        res.status(500).json({
            ok : false,
            msg : 'Hable con el administrador de sistemas'

        });
    }
}



module.exports = {
    getEventos,
    crearEventos,
    actualizarEvento,
    borrarEvento
}




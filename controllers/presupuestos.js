const { response } = require('express');


const Presupuesto =  require('../models/Presupuestos');

//obtener todos los presupuestos

const getPresupuesto = async ( req, res =response ) => {
    
        const presupuestos = await Presupuesto.find()
                                            .populate('user', 'name')
                                            

    
        res.json({
            ok : true,
            presupuestos
        });  
}

//obtener un presupuesto por id

const getPresupuestoById = async ( req, res =response ) => {

    const id = req.params.id;

    try {
        if ( !id ) {
            return res.status(400).json({
                ok : false,
                msg : 'No se ha enviado un id'
            });
        }
        const presupuesto = await Presupuesto.findById( id )
                                        .populate('user', 'name');
        if ( !presupuesto ) {
            return res.status(404).json({
                ok : false,
                msg : 'Presupuesto no encontrado por id'
            });
        }

        res.json({
            ok : true,
            presupuesto
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok : false,
            msg : 'Hable con el administrador'
        });
    }
}

//crear un nuevo presupuesto

const crearPresupuesto = async ( req, res =response ) => {    
        const uid = req.uid;
        const presupuesto = new Presupuesto({
            user: uid,
            ...req.body
        }); 

        try {    
            const presupuestoDB = await presupuesto.save();
    
            res.json({
                ok : true,
                presupuesto : presupuestoDB
            });
    
        } catch (error) {
            console.log(error);
            res.status(500).json({
                ok : false,
                msg : 'Hable con el administrador'
            });
        }
}


//actualizar presupuesto

const actualizarPresupuesto = async ( req, res =response ) => {

    const id = req.params.id;

    try {
        const presupuesto = await Presupuesto.findById( id );
        if ( !presupuesto ) {
            return res.status(404).json({
                ok : false,
                msg : 'Presupuesto no encontrado por id'
            });
        }
        const cambiosPresupuesto = {
            ...req.body,
            user : req.uid
        }
        const cambioPresupuestoDB = await Presupuesto.findByIdAndUpdate( id, cambiosPresupuesto, { new : true } );
        res.json({
            ok : true,
            presupuesto : cambioPresupuestoDB
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


//borrar presupuesto

const borrarPresupuesto = async ( req, res =response ) => {

    const id = req.params.id;
    const uid = req.uid;

    try {
        const presupuesto = await Presupuesto.findById( id );
        if ( !presupuesto ) {
            return res.status(404).json({
                ok : false,
                msg : 'Presupuesto no encontrado por id'
            });
        }
        await Presupuesto.findByIdAndDelete( id );
        res.json({
            ok : true,
            msg : 'Presupuesto eliminado'
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


module.exports = {

    getPresupuesto,
    getPresupuestoById,
    crearPresupuesto,
    actualizarPresupuesto,
    borrarPresupuesto

}


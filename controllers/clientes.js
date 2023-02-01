const { response } = require('express');


const Cliente = require('../models/Clientes');

//obtener todos los clientes

const getCliente = async ( req, res =response ) => {

    const clientes = await Cliente.find()
                                  .populate('user', 'name email');

    res.json({
        ok : true,
        clientes
    });
    
       
    }

//obtener un cliente por id

const getClienteById = async ( req, res =response ) => {

    const id = req.params.id;

    try {
        if ( !id ) {
            return res.status(400).json({
                ok : false,
                msg : 'No se ha enviado un id'
            });
        }

        const cliente = await Cliente.findById( id )
                                     .populate('user', 'name email');


        if ( !cliente ) {
            return res.status(404).json({
                ok : false,
                msg : 'Cliente no encontrado por id'
            });
        }

        res.json({
            ok : true,
            cliente
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

//crear un nuevo cliente

const crearCliente = async ( req, res =response ) => {
    const cliente = req.body;
    try {

       cliente.user = req.uid;
       const clienteDB = await Cliente.create( cliente );

        res.json({
            ok : true,
            cliente : clienteDB
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

//actualizar cliente

const actualizarCliente = async ( req, res =response ) => {

    const id = req.params.id;

    try {

        const cliente = await Cliente.findById( id );

        if ( !cliente ) {
            return res.status(404).json({
                ok : false,
                msg : 'Cliente no encontrado por id'
            });
        }

        if ( cliente.user.toString() !== req.uid ) {
            return res.status(401).json({
                ok : false,
                msg : 'No tiene privilegio de editar este cliente'
            });

        }
        const nuevoCliente = {
            ...req.body,
            user : req.uid
        }
        const nuevoClienteDB = await Cliente.findByIdAndUpdate( id, nuevoCliente, { new : true } );
        res.json({
            ok : true,
            cliente : nuevoClienteDB
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

//borrar cliente

const borrarCliente = async ( req, res =response ) => {

    const id = req.params.id;
    const uid = req.uid;



    try {

        const cliente = await Cliente.findById( id );

        if ( !cliente ) {

            return res.status(404).json({
                ok : false,
                msg : 'Cliente no encontrado por id'
            });

        }

        if ( cliente.user.toString() !== uid ) {
            return res.status(401).json({
                ok : false,
                msg : 'No tiene privilegio de eliminar este cliente'
            });
        }

        await Cliente.findByIdAndDelete( id );

        res.json({
            ok : true,
            msg : 'Cliente eliminado'
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
    getCliente,
    getClienteById,
    crearCliente,
    actualizarCliente,
    borrarCliente
}


const { response } = require('express');

const Producto = require('../models/Productos');



//obtener todos los productos

const getProducto = async ( req, res =response ) => {

    const productos = await Producto.find()
                                    .populate('user', 'name email');

    res.json({
        ok : true,
        productos
    });   
}

//obtener un producto por id

const getProductoById = async ( req, res =response ) => {


    const id = req.params.id;

    try {

        if ( !id ) {
            return res.status(400).json({
                ok : false,
                msg : 'No se ha enviado un id'
            });
        }

      const producto = await Producto.findById( id )

                                    .populate('user', 'name email');

        if ( !producto ) {
            return res.status(404).json({
                ok : false,
                msg : 'Producto no encontrado por id'
            });
        }

        res.json({

            ok : true,
            producto

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

//crear un nuevo producto

const crearProducto = async ( req, res =response ) => {

    const producto = new Producto( req.body );

    try {            
            producto.user = req.uid;    
            const productoDB = await producto.save();    
            res.json({
                ok : true,
                producto : productoDB
            });
    
        } catch (error) {
            console.log(error);
            res.status(500).json({
                ok : false,
                msg : 'Hable con el administrador'
            });
        }
}

//actualizar producto

const actualizarProducto = async ( req, res =response ) => {
    const id = req.params.id;
    try {
        const producto = await Producto.findById( id );
        if ( !producto ) {
            return res.status(404).json({
                ok : false,
                msg : 'Producto no encontrado por id'
            });
        }
        if ( producto.user.toString() !== req.uid ) {
            return res.status(401).json({
                ok : false,
                msg : 'No tiene privilegio de editar este producto'
            });
        }
        const nuevoProducto = {
            ...req.body,
            user : req.uid
        }
        const nuevoProductoDB = await Producto.findByIdAndUpdate( id, nuevoProducto, { new : true } );
        res.json({
            ok : true,
            producto : nuevoProductoDB
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

//borrar producto

const borrarProducto = async ( req, res =response ) => {
    const id = req.params.id;
    const uid = req.uid;

    try {
        const producto = await Producto.findById( id );

        if ( !producto ) {
            return res.status(404).json({
                ok : false,
                msg : 'Producto no encontrado por id'
            });
        }

        if ( producto.user.toString() !== uid ) {
            return res.status(401).json({
                ok : false,
                msg : 'No tiene privilegio de eliminar este producto'
            });
        }

        await Producto.findByIdAndDelete( id );

        res.json({
            ok : true,
            msg : 'Producto eliminado'
        });       

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok : false,
            msg : 'Hable con el administrador'
        });
    }    
}

module.exports = {
    getProducto,
    getProductoById,
    crearProducto,
    actualizarProducto,
    borrarProducto
}









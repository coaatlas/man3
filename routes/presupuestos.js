const { Router } = require('express');
const { validarJWT } = require('../middleware/validar-jwt');
const { validarCampos } = require('../middleware/validar-campos');
const router = Router();

const { getPresupuesto,getPresupuestoById, crearPresupuesto, actualizarPresupuesto, borrarPresupuesto } = require('../controllers/presupuestos');

const { check } = require('express-validator');

router.use( validarJWT );

//obtener todos los presupuestos

router.get('/', getPresupuesto);

//obtener un presupuesto por id

router.get('/:id', getPresupuestoById);

//crear un nuevo presupuesto

router.post('/',
[
    check ('pedido', 'El pedido es obligatorio' ).not().isEmpty(),
    check ('total', 'El total es obligatorio' ).not().isEmpty(),
    check ('cliente', 'El cliente es obligatorio' ).not().isEmpty(),
    validarCampos
],
crearPresupuesto);

//actualizar presupuesto

router.put('/:id',
[
    check ('pedido', 'El pedido es obligatorio' ).not().isEmpty(),
    check ('total', 'El total es obligatorio' ).not().isEmpty(),
    check ('cliente', 'El cliente es obligatorio' ).not().isEmpty(),
    validarCampos
],
 actualizarPresupuesto);

//borrar presupuesto

router.delete('/:id', borrarPresupuesto);

module.exports = router;


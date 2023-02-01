const { Router } = require('express');
const { validarJWT } = require('../middleware/validar-jwt');
const { validarCampos } = require('../middleware/validar-campos');
const router = Router();
const { getCliente,getClienteById, crearCliente, actualizarCliente, borrarCliente } = require('../controllers/clientes');

const { check } = require('express-validator');

router.use( validarJWT );

//obtener todos los clientes

router.get('/', getCliente);

//obtener un cliente por id

router.get('/:id', getClienteById);

//crear un nuevo cliente

router.post('/',
[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El apellido es obligatorio').not().isEmpty(),
    check('empresa', 'La empresa es obligatoria').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('telefono', 'El telefono es obligatorio').not().isEmpty(),
    validarCampos
], crearCliente);

//actualizar cliente

router.put('/:id',
[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El apellido es obligatorio').not().isEmpty(),
    check('empresa', 'La empresa es obligatoria').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('telefono', 'El telefono es obligatorio').not().isEmpty(),
    validarCampos
],
 actualizarCliente);

//borrar cliente

router.delete('/:id', borrarCliente);

module.exports = router;



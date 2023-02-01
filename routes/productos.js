//productos routes
//host + /api/productos

const { Router } = require('express');
const { validarJWT } = require('../middleware/validar-jwt');
const { validarCampos } = require('../middleware/validar-campos');
const router = Router();
const { getProducto,getProductoById, crearProducto, actualizarProducto, borrarProducto } = require('../controllers/productos');
const { check } = require('express-validator');

router.use( validarJWT );


//obtener todos los productos

router.get('/', getProducto);

//obtener un producto por id

router.get('/:id', getProductoById);

//crear un nuevo producto

router.post('/', 
[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('precio', 'El precio es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    check('categoria', 'La categoria es obligatoria').not().isEmpty(),
    validarCampos
],
 crearProducto);

//actualizar producto

router.put('/:id',
[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('precio', 'El precio es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    check('categoria', 'La categoria es obligatoria').not().isEmpty(),
    validarCampos
],
actualizarProducto);

//borrar producto

router.delete('/:id', borrarProducto);


module.exports = router;





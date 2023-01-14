//events routes
//host + /api/events

const { Router } = require('express');
const { validarJWT } = require('../middleware/validar-jwt');

const { getEventos, crearEventos, actualizarEvento, borrarEvento } = require('../controllers/events');
const { validarCampos } = require('../middleware/validar-campos');
const { check } = require('express-validator');
const { isDate } = require('../helpers/isDate');

const router = Router();

router.use(validarJWT);

//obtener todos los eventos
router.get('/' , getEventos);

//crear un nuevo evento
router.post('/', 
    [
        check('title', 'Title is required').not().isEmpty(),       
        check('start', 'Start date is required').custom( isDate ),
        check('end', 'End date is required').custom( isDate ),            
        validarCampos
    ],
crearEventos);

//actualizar evento
router.put('/:id',

    [
        check('title', 'Title is required').not().isEmpty(),
        check('start', 'Start date is required').custom( isDate ),
        check('end', 'End date is required').custom( isDate ),
        validarCampos
    ],
 actualizarEvento);

//borrar evento
router.delete('/:id',borrarEvento);

module.exports = router;


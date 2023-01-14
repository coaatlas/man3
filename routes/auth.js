// Description: This file contains the routes for the authentication of the user.
// host + /api/auth

const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

const { crearUsuario, loginUsuario, deleteUsuario, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middleware/validar-campos');

const { validarJWT } = require('../middleware/validar-jwt');


    router.post   ('/new',  
    [  
        check('name', 'Name is required').not().isEmpty(),  
        check('email', 'Email is required').isEmail(),
        check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
        validarCampos  
      
    ], crearUsuario); 

    router.post   ('/',
    [ 
        check('email', 'Email is required').isEmail(),
        check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
        validarCampos
    ] , loginUsuario  );

    router.delete ('/',
    [ 
        check('email', 'Email is required').isEmail(),
        check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
        validarCampos
    ]
     ,deleteUsuario);    

    router.get('/renew',validarJWT,renewToken);  
  
    

module.exports = router;





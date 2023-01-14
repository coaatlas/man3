const { response } = require('express');
const jwt = require('jsonwebtoken');


const validarJWT = (req, res = response, next) => {
    
    // Leer el token
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            message: 'There is no token in the request'
        })
    }

    try {
        const { uid, name } = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );

        req.uid = uid;
        req.name = name;

    } catch (error) {

        return res.status(401).json({
            ok: false,
            message: 'Invalid token'
        })

    }  
    next();
}


module.exports = {
    validarJWT
    }



const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');



//=========crearUsuario==============================================================
    const crearUsuario =async(req, res = response) => {        
        
        const { email, password } = req.body;
        const usuario = new Usuario(req.body);

          try {              
            let existeEmail = await Usuario.findOne({email: email});
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    message: 'El correo ya está registrado'
                })
            }
              
                //Encriptar contraseña
               const salt = bcrypt.genSaltSync();
               usuario.password = bcrypt.hashSync(password, salt);

                //Guardar usuario
                 await usuario.save();

                 //Generar JWT

                 const token = await generarJWT(usuario.id, usuario.name);
                 res.status(201).json({
                    ok: true,
                     message: 'User created',
                       user: usuario.name,
                       uid : usuario.id,
                        token
                 }
              )                  

              } catch (error) {
                console.log(error);
                 return res.status(500).json({
                ok: false,
                message: 'Error inesperado... revisar logs'
            })
        }        
              

    }

//=========loginUsuario======================================================================================

    const loginUsuario = async (req, res = response) => {
        const { email, password } = req.body;

        try{
            const usuario = await Usuario.findOne({email : email});
            if (!usuario) {
                return res.status(400).json({
                    ok: false,
                    message: 'El usuario no existe con ese email'
                })
            }

            //Confirmar los passwords
            const validPassword = bcrypt.compareSync(password, usuario.password);
            if (!validPassword) {
                return res.status(400).json({
                    ok: false,
                    message: 'Password incorrecto'
                })
            }

            //Generar JWT

            const token = await generarJWT(usuario.id, usuario.name);
            
            //Respuesta del servicio

            res.json({
                ok: true,
                message: 'User logged in',
                uid: usuario.id,
                name: usuario.name,
                token
            })
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                message: 'Error inesperado... revisar logs'
            })
        }     
       
        }

//=========deleteUsuario======================================================================================
    const deleteUsuario = (req, res = response) => {
        const { uid, name } = req;

        res.json({
        ok: true,
        message: 'User logged out',
        uid,
        name
        })    
        }

//=========renewToken======================================================================================
    const renewToken =async (req, res = response) => {
        const { uid, name } = req;               
        //Generar JWT

        const token = await generarJWT(uid, name);

        res.json({
        ok: true,
        message: 'Token renewed',       
        token         
        })   
         }



module.exports = {
    crearUsuario,
    loginUsuario,
    deleteUsuario,
    renewToken
    }


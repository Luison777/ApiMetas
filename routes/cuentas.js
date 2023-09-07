var express = require('express');
const { crear, pedirCuenta } = require('../db/pedidos');
const { body, validationResult } = require('express-validator');
const  bcrypt  =  require ( 'bcrypt' ) ; 
var jwt = require('jsonwebtoken');
var router = express.Router();

/* Post crear cuenta*/
router.post('/signup',
    body('usuario').isEmail(),
    body('hash').isLength({min:5}),
    function(req, res, next) {
        const errors=validationResult(req);
        const nuevaCuenta=req.body;
        if (errors.isEmpty()){
            return bcrypt . hash ( nuevaCuenta.hash, 10,  function ( err ,  hash )  { 
                if(err)return next(err);
                // Almacena el hash en tu base de datos de contraseña. 
                crear('cuentas',{"usuario":nuevaCuenta.usuario,"hash":hash},(err,cuenta)=>{
                    if(err) return next(err);          
                res.send(cuenta);
                });
            } ) ;
        }
        res.status(400).json({ errors:errors.array() });
    }
);

/* Post Login*/
router.post('/login',
    body('usuario').isEmail(),
    body('hash').isLength({min:5}),
    function(req, res, next) {
        const errors=validationResult(req);
        const login=req.body;
        if (errors.isEmpty()){
            return pedirCuenta(login.usuario,(err,[cuenta])=>{
                if(err) return next(err);
                if(!cuenta) return res.sendStatus(404);
                bcrypt.compare(login.hash, cuenta.hash, function(err, result) {
                    if(err) return next(err);
                    if(!result) return res.sendStatus(401);
                    let ficha = jwt.sign({
                        exp: Math.floor(Date.now() / 1000) + (60 * 2),
                        usuario:login.usuario
                      }, 'secretillo');
                    res.send({token:ficha});
                });
            });
        }
        res.status(400).json({errors: errors.array()});
    }
);

module.exports=router;
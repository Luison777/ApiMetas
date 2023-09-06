var express = require('express');
const { crear } = require('../db/pedidos');
const { body, validationResult } = require('express-validator');
 var router = express.Router();

/* GET list de usuarios*/
router.post('/',
    body('usuario').isEmail(),
    body('hash').isLength({min:5}),
    function(req, res, next) {
        const errors=validationResult(req);
        const nuevaCuenta=req.body;
        if (errors.isEmpty()){
            return crear('cuentas',nuevaCuenta,(err,cuenta)=>{
                if(err){
                    return next(err);
                        }
            res.send(cuenta);
            });
        }
        res.status(400).json({ errors:errors.array() });
    }
);

module.exports=router;
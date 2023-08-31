
var express = require('express');
const { pedirTodas, pedirMeta, crear, actualizar, borrar } = require('../db/pedidos');
var router = express.Router();
let metas=[
  {
    "id":"1",
    "detalles":"correr por 30 min ",
    "plazo":"dia",
    "frecuencia":"1",
    "icono":"emoji",
    "meta":"365",
    "fecha":"ffff",
    "completado":"5"
  },
  {
    "id":"2",
    "detalles":"correr por 30 min ",
    "plazo":"dia",
    "frecuencia":"1",
    "icono":"emoji",
    "meta":"365",
    "fecha":"ffff",
    "completado":"5"
  },
  {
    "id":"3",
    "detalles":"correr por 30 min ",
    "plazo":"dia",
    "frecuencia":"1",
    "icono":"emoji",
    "meta":"365",
    "fecha":"ffff",
    "completado":"5"
  }
]
/* GET list de metas*/
router.get('/', function(req, res, next) {
  pedirTodas('metas',(err,metas)=>{
    if(err){
      return next(err);
    }
    res.send(metas);
  });
});
/* GET meta con id*/
router.get('/:id', function(req, res, next) {
  const id=req.params.id;
  pedirMeta('metas',id,(err,meta)=>{
    if(err){
      return next(err);
    }
    if(!meta.length){
      return res.sendStatus(404);
    }
    res.send(meta[0]);
  });
});
/* POST crear meta*/
router.post('/', function(req, res, next) {
  const nuevaMeta=req.body;
 crear('metas',nuevaMeta,(err,meta)=>{
  if(err){
    return next(err);
  }
  res.send(meta);
 });
});
/* PUT actualizar meta */
router.put('/:id', function(req, res, next) {
  const body=req.body;
  const id=req.params.id;
  if (body.id!== +id){
    return res.sendStatus(409);
  }
  pedirMeta('metas',id,(err,meta)=>{
    if(err){
      return next(err);
    }
    if (!meta.length){
      return res.sendStatus(404);
    }
    actualizar('metas',id,body,(err,actualizada)=>{
      if(err){
        return next(err);
      }
      res.send(actualizada);
    });
  });
});
/* DELETE borrar meta */
router.delete('/:id', function(req, res, next) {
  const id=req.params.id;
  pedirMeta('metas',id,(err,meta)=>{
    if(err){
      return next(err);
    }
    if (!meta.length){
      return res.sendStatus(404);
    }
    borrar('metas',id,(err)=>{
      if(err){
        return next(err);
      }
      res.sendStatus(204);
    });
  });
});

module.exports = router;

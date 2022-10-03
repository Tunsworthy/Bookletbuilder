'use strict';
const mongoose = require('mongoose'),
Response = mongoose.model('ResponseSchema')

const exports = module.exports;
module.exports = function(app){
  
  app.get('/response/all',function(req,res){
    Response.find({},function(err,data){
        if (err)
            res.send(err)
        res.json(data)
    })
  });

}
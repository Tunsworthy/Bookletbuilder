'use strict';
const mongoose = require('mongoose'),
  ESVConfig = mongoose.model('ESVConfig')

  const exports = module.exports;
module.exports = function(app){
  // Event Routes
  app.get('/esv',function(req,res){
    ESVConfig.find({},function(err,esv){
        if (err)
            res.send(err)
        //console.log(esv)
        res.render('esv_api_config',{title: process.env.PROGRAM_NAME, data: esv[0]});
    })
  });

    app.get('/esvconfig',function(req,res){
        //console.log(req.params)
        ESVConfig.find({},function(err,esv){
            if (err)
                res.send(err)
            res.json(esv)
        })
    });

  app.post('/esvconfig',function(req,res){
    console.log('called post');
    console.log(req.body);
    let new_config = new ESVConfig(req.body);
    new_config.save(function(err,config){
      if(err)
       res.send(err)

      console.log(config)
      res.redirect('/esv')
    })
  });

  app.post('/esv',function(req,res){
    //console.log('called post');
    //console.log(req.body._id)
    //console.log(req.body)
    ESVConfig.findOneAndReplace({_id:req.body._id},req.body,{setDefaultsOnInsert: true, new: true, upsert: true},function(err,config){
      if (err)
          res.send(err)
      //console.log(config)
      res.redirect('/esv')
    })
  });


  app.delete('/esvconfig',function(req,res){
    ESVConfig.deleteMany({},function(err,esv){
      if(err)
        res.send(err)
      res.json({message: 'All ESV Profiles removed'})}
      );
  });

}
'use strict';

let query_builder = require('.././backend/query_builder.js')

const mongoose = require('mongoose'),
  Booklet = mongoose.model('BookletSchema'),
  SplitsSchema = mongoose.model('SplitsSchema')

  exports = module.exports;
module.exports = function(app){
  //Route used to create a new booklet
  app.get('/booklet/new',function(req,res){
        res.render('/booklet/new',{title: process.env.PROGRAM_NAME});
  });

  app.post('/booklet/new',function(req,res){
    console.log('called post');
    console.log(req.body);
    let new_entry = new Booklet(req.body);
    new_entry.save(function(err,entry){
      if(err)
       res.send(err)

      console.log(entry)
      res.json(entry)
      //res.redirect('/booklet/list')
    })

  })

  //Route to get list of bookelets by user
  app.get('/booklet/all',function(req,res){
        //console.log(req.params)
        Booklet.find({userid: "Example"},function(err,data){
            if (err)
                res.send(err)
            res.json(data)
        })
    });

//Delete bookelet
  app.delete('/booklet/all',function(req,res){
    Booklet.deleteMany({},function(err,data){
      if(err)
        res.send(err)
      res.json({message: 'All booklets removed'})}
      );
  });

  //Delete split by ID
  app.delete('/booklet/:id',function(req,res){
    console.log('called delete');
    console.log(req.body);
    Booklet.findOneAndDelete({__id: req.params.id},req.body,function(err,data){
      if(err)
       res.send(err)
      res.json(data)
    })
  });

}
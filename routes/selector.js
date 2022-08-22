'use strict';
var mongoose = require('mongoose'),
BookSchema = mongoose.model('BookSchema')

var exports = module.exports;
module.exports = function(app){
  // Event Routes
  app.get('/selector',function(req,res){
    BookSchema.findOne({name: "Romans"},function(err,book){
        if (err)
            res.send(err)
        res.render('selector',{title: process.env.PROGRAM_NAME, data: book});
    })
  });

  app.get('/book',function(req,res){
    BookSchema.find({},function(err,book){
        if (err)
            res.send(err)
        res.json(book)
    })
  });

  app.post('/book',function(req,res){
    console.log('called post');
    console.log(req.body);
    var new_book = new BookSchema(req.body);
    new_book.save(function(err,book){
      if(err)
       res.send(err)
      res.json(book)
    })
  });

  app.delete('/book/all',function(req,res){
    BookSchema.deleteMany({},function(err,book){
      if(err)
        res.send(err)
      res.json({message: 'All books removed'})}
      );
  });

  app.post('/range',function(req,res){
    console.log('called post range');
    console.log(req.body);
    res.render('range',{startid: req.body.startid,endid: req.body.endid})
  });

}
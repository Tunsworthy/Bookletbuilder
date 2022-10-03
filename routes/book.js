'use strict';
const mongoose = require('mongoose'),
BookSchema = mongoose.model('BookSchema')

exports = module.exports;
module.exports = function(app){
  
  app.get('/book',function(req,res){
    BookSchema.find({},function(err,book){
        if (err)
            res.send(err)
        res.json(book)
    })
  });

  app.get('/booklist',function(req,res){
    BookSchema.find({},'name',function(err,book){
        if (err)
            res.send(err)
        res.render('book/view',{title: process.env.PROGRAM_NAME, data: book})
    })
  });

  app.get('/booklist',function(req,res){
    BookSchema.find({},'name',function(err,book){
        if (err)
            res.send(err)
        res.json(book)
    })
  });

  app.post('/book',function(req,res){
    console.log('called post');
    console.log(req.body);
    let new_book = new BookSchema(req.body);
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



}
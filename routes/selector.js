'use strict';

let alertdata = {
  "message" : "An Example Alert",
  "type" : "Success"
}

const mongoose = require('mongoose'),
BookSchema = mongoose.model('BookSchema')

exports = module.exports;
module.exports = function(app){
  // Event Routes
  app.get('/selector/:book',function(req,res){
    BookSchema.findOne({name: req.params.book},function(err,book){
        if (err)
            res.send(err)
        console.log(book)
        res.render('selector',{title: process.env.PROGRAM_NAME, data: book, alert: JSON.stringify(alertdata)});
    })
  });

}
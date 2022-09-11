'use strict';
var mongoose = require('mongoose'),
SplitsSchema = mongoose.model('SplitsSchema')

var exports = module.exports;
module.exports = function(app){
  // Event Routes

//Splits needs to have
//Get Splits by User ID - this will show all the splits a user has ever created
  app.get('/splits',function(req,res){
    SplitsSchema.find({userid: "Example"},function(err,splits){
      if (err)
          res.send(err)
      console.log(splits)
      res.render('splits/view',{title: process.env.PROGRAM_NAME, data: splits});
    })
  });

//Get Splits by ID - find a split by it's ID
app.get('/split/:id',function(req,res){
  SplitsSchema.find({__id: req.params.id},function(err,splits){
    if (err)
        res.send(err)
    console.log(splits)
    res.render('splits/view',{title: process.env.PROGRAM_NAME, data: splits});
  })
});

//Save new Split
  app.post('/split',function(req,res){
    console.log('called post split');
    console.log(req.body);
    let new_selection = new SplitsSchema(req.body);
    new_selection.save(function(err,sel){
      if(err)
       res.send(err)
      res.json(sel)
    })
  });


//Update existing split - find one and update
app.post('/split/update/:id',function(req,res){
  console.log('called post split');
  console.log(req.body);
  SplitsSchema.findOneAndUpdate({__id: req.params.id},req.body,function(err,split){
    if(err)
     res.send(err)
    res.json(split)
  })
});

//Delete split by ID
app.post('/split/delete/:id',function(req,res){
  console.log('called post split');
  console.log(req.body);
  SplitsSchema.findOneAndDelete({__id: req.params.id},req.body,function(err,split){
    if(err)
     res.send(err)
    res.json(split)
  })
});

app.get('/splits_all',function(req,res){
  SplitsSchema.find({},function(err,splits){
    if (err)
        res.send(err)
    console.log(splits)
    res.json(splits);
  })
});

app.delete('/splits_all',function(req,res){
  SplitsSchema.deleteMany({},function(err,splits){
    if (err)
        res.send(err)
    console.log(splits)
    res.json(splits);
  })
});
}
/*
Format 
  Book
  UserID
  Version
  Selection
*/

'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

  const DetailsSchema = new Schema({
    range_start_id: {
      type: Number
    },   
    range_end_id: {
      type: Number
    }
  });


  const SelectionSchema = new Schema({
    userid: {
      type: String
    },
    version: {
      type: String
    },
    book: {
      type: String
    },
    selection:[DetailsSchema]
  });

module.exports = mongoose.model('SelectionSchema', SelectionSchema);

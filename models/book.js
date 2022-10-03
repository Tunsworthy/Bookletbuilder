/*
Format 
  Book 
    -Chapters (has many)
     -End Verses
*/

'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

  const VersesSchema = new Schema({
    verseno: {
      type: Number
    }
  });

  const ChaptersSchema = new Schema({
    chapterno: {
      type: Number
    },
    verses: []
  });


  const BookSchema = new Schema({
    order: {
      type: Number
    },
    name: {
      type: String
    },
    chapters:[ChaptersSchema]
  });

module.exports = mongoose.model('BookSchema', BookSchema);

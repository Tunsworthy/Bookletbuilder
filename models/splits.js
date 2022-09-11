/*
A book and be split into many sections
Format 
  __ID
  __V
  Book
  UserID
  Nickname
  sections
*/

'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

  const SectionsSchema = new Schema({
    range_start_id: {
      type: String
    },   
    range_end_id: {
      type: String
    }
  });


  const SplitsSchema = new Schema({
    userid: {
      type: String
    },
    nickname: {
      type: Number
    },
    book: {
      type: String
    },
    sections:[SectionsSchema]
  });

module.exports = mongoose.model('SplitsSchema', SplitsSchema);

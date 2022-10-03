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
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//For each split there will be a status of 'retrevied' 
  const splits_idSchema = new Schema({
    split_id: {
        type: String
    }
  });

//gd = Google Doc
  const BookletSchema = new Schema({
    userid: {
      type: String
    },
    bookletname: {
      type: String
    },
    selected_splits:[splits_idSchema],
    gd_prefex_id:{
        type: String
    },
    gd_passage_id:{
        type: String
    }
  });

module.exports = mongoose.model('BookletSchema', BookletSchema);

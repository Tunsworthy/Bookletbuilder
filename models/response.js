

'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
  const ResponseSchema = new Schema({
    run_id: {
        type: String
    },
    booklet_id: {
      type: String
    },
    order: {
      type: Number
    },
    splits_id: {
      type: String
    },
    query: {
        type: String
    },
    canonical: {
        type: String
    },
    parsed: [],
    passage_meta:[],
    passages:[]
  });

module.exports = mongoose.model('ResponseSchema', ResponseSchema);

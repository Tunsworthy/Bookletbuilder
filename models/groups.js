/*
Groups will allow multiple splits to be added to them. 
Groups will be what is used to generate a booklet - so this will allow you to have differen book splits in a single booklet.
*/

'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

  const SectionsSchema = new Schema({
    id: {
      type: String
    }
  });


  const GroupsSchema = new Schema({
    userid: {
      type: String
    },
    name: {
      type: Number
    },
    selection_ids:[SectionsSchema]
  });

module.exports = mongoose.model('GroupsSchema', GroupsSchema);

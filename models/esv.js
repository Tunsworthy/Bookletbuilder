'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

  const ESVSchema = new Schema({
    url: {
      type: String
    },
    authorization: {
      type: String
    },
    include_first_verse_numbers: {
      type: String,
      default: 'off'
    },
    include_footnotes: {
      type: String,
      default: 'off'
    },
    indent_using: {
      type: String,
      default: 'tab'
    },
    indent_paragraphs: {
      type: String
    },
    include_headings: {
      type: String,
      default: 'off'
    },
    include_footnote_body: {
      type: String,
      default: 'off'
    },
    include_passage_references: {
      type: String,
      default: 'off'
    },
    include_short_copyright: {
      type: String,
      default: 'off'
    },
    indent_poetry_lines: {
      type: String,
    },
    include_subheadings: {
      type: String,
      default: 'off'
    },
    wrapping_div: {
      type: String,
      default: 'off'
    },
    div_classes: {
      type: String,
      default: 'off'
    },
    include_crossrefs: {
      type: String,
      default: 'off'
    }
  });


module.exports = mongoose.model('ESVConfig', ESVSchema);

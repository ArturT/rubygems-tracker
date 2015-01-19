'use strict';

var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var GemStatisticSchema = new Schema({
  totalDownloads: {
    type: Number,
    required: true
  },
  recentDownloads: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  }
});
GemStatisticSchema.plugin(uniqueValidator);

var GemSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    match: /^[0-9a-z_-]+$/i,
    index: {
      unique: true
    }
  },
  totalDownloads: {
    type: Number,
    required: true,
    default: 0
  },
  gemStatistics: [GemStatisticSchema]
});
GemSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Gem', GemSchema);

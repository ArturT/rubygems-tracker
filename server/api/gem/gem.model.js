'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GemStatisticSchema = new Schema({
  total_downloads: Number,
  recent_downloads: Number,
  date: {
    type: Date,
    default: Date.now
  }
});

var GemSchema = new Schema({
  name: {
    type: String,
    index: true
  },
  total_downloads: {
    type: Number,
    default: 0
  },
  gem_statistics: [GemStatisticSchema]
});

module.exports = mongoose.model('Gem', GemSchema);

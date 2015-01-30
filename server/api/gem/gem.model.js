'use strict';

var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;
var GemStatisticSchema = require('./gem_statistic.schema');

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
    required: true
  },
  gemStatistics: [GemStatisticSchema]
});
GemSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Gem', GemSchema);

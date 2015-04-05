'use strict';

var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;
var DateService = require('../../services/date.service');

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
    default: DateService.dayWithoutHours,
  }
});

module.exports = GemStatisticSchema;

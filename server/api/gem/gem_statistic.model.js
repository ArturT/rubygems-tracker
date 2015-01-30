'use strict';

var mongoose = require('mongoose');
var GemStatisticSchema = require('./gem_statistic.schema.js');

module.exports = mongoose.model('GemStatistic', GemStatisticSchema);

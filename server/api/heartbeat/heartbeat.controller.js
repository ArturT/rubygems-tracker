'use strict';

// v1
exports.index = function(req, res) {
  var _ = require('lodash');
  var Gem = require('../gem/gem.model');
  var GemService = require('../../services/gem.service');

  console.log('[' + new Date() + '] updateGemStats via heartbeat');
  Gem.find({}, function (err, gems) {
    if (err) {
      console.log('[' + new Date() + '] updateGemStats via heartbeat - Error:', err);
    } else {
      _(gems).forEach(GemService.updateGemStats);
    }
  });

  return res.json(200, ['OK']);
};

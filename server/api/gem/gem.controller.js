/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /gems              ->  index
 * GET     /gems/:id          ->  show
 */

'use strict';

var _ = require('lodash');
var Gem = require('./gem.model');

// Get list of gems
exports.index = function(req, res) {
  Gem.find(function (err, gems) {
    if(err) { return handleError(res, err); }
    return res.json(200, gems);
  });
};

// Get a single gem
exports.show = function(req, res) {
  Gem.findById(req.params.id, function (err, gem) {
    if(err) { return handleError(res, err); }
    if(!gem) { return res.send(404); }
    return res.json(gem);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}

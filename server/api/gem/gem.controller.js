/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /gems              ->  index
 * POST    /gems              ->  create
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

// Creates a new gem in the DB.
exports.create = function(req, res) {
  var newGem = { name: req.body.name };

  // check if gem already exists in DB
  Gem.find(newGem, function(err, gems) {
    if (err) { return handleError(res, err); }

    if (gems.length > 0) {
      var errMsg = { err: ('Gem ' + newGem.name + ' already exists in our database.') };
      return res.json(422, errMsg);
    }

    // TODO check if gem exists on rubygems

    Gem.create(newGem, function(err, gem) {
      if(err) { return handleError(res, err); }
      return res.json(201, gem);
    });
  });
};

// Get a single gem
exports.show = function(req, res) {
  Gem.findOne({ name: req.params.name }, 'name total_downloads gem_statistics', function (err, gem) {
    if(err) { return handleError(res, err); }
    if(!gem) { return res.send(404); }
    return res.json(gem);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}

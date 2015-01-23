/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /gems              ->  index
 * POST    /gems              ->  create
 * GET     /gems/:id          ->  show
 */

'use strict';

var _ = require('lodash');
var https = require('https');
var Gem = require('./gem.model');
var RubyGemsService = require('../../services/rubygems.service');

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

  if (newGem.name.length == 0) {
    return res.json(400, {
      errors: { name: { message: 'The gem name is missing.' } }
    });
  }

  RubyGemsService.getGem({
    gemName: newGem.name,

    onSuccess: function (gemData) {
      newGem.totalDownloads = gemData.downloads;

      Gem.create(newGem, function(err, gem) {
        if(err) { return handleError(res, err); }
        return res.json(201, gem);
      });
    },

    onGemNotFound: function(message) {
      return res.json(400, {
        errors: { name: { message: message } }
      });
    },

    onInvalidJSON: function(message) {
      return res.json(400, {
        errors: { name: { message: 'Unexpected error from rubygems.org, please try later or use proper gem name.' } }
      });
    },

    onError: function (e) {
      console.log("Got error: " + e.message);
      return res.json(500, {
        errors: { name: { message: 'Server error, try again later.' } }
      });
    }
  });
};

// Get a single gem
exports.show = function(req, res) {
  Gem.findOne({ name: req.params.name }, 'name totalDownloads gemStatistics', function (err, gem) {
    if(err) { return handleError(res, err); }
    if(!gem) { return res.send(404); }
    return res.json(gem);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}

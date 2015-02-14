'use strict';

var https = require('https');

module.exports = {
  getGem: function(args) {
    return rubygemsGet(args, endpoint('gems', args.gemName));
  },

  getVersions: function(args) {
    return rubygemsGet(args, endpoint('versions', args.gemName));
  }
};

var errorMessages = {
  gemNotFound: 'This rubygem could not be found.',
  invalidJSON: 'Unexpected error from rubygems.org, response is invalid JSON'
};

function rubygemsGet(args, endpoint) {
  var gemName = args.gemName;
  var onSuccess = args.onSuccess;
  var onGemNotFound = args.onGemNotFound || defaultOnGemNotFound;
  var onInvalidJSON = args.onInvalidJSON || defaultOnInvalidJSON;
  var onError = args.onError || defaultOnError;

  var onResponse = function(response) {
    defaultOnResponse(response, onSuccess, onGemNotFound, onInvalidJSON);
  };

  https.get(endpoint, onResponse)
  .on('error', onError)
  .end();
}

function endpoint(scope, gemName) {
  return "https://rubygems.org/api/v1/" + scope + "/" + gemName + ".json";
}

function defaultOnResponse(response, onSuccess, onGemNotFound, onInvalidJSON) {
  var responseData = '';
  response.on('data', function(chunk) {
    responseData += chunk;
  }).on('end', function() {
    try {
      var jsonData = JSON.parse(responseData);
      try {
        onSuccess(jsonData);
      } catch (e) {
        console.log('onSuccess callback has error', e);
      }
    } catch (e) {
      if (responseData == errorMessages.gemNotFound) {
        onGemNotFound(errorMessages.gemNotFound);
      } else {
        onInvalidJSON(errorMessages.invalidJSON);
      }
    }
  });
}

function defaultOnGemNotFound(message) {
  console.log(message);
}

function defaultOnInvalidJSON(message) {
  console.log(message);
}

function defaultOnError(e) {
  console.log("Got error: " + e.message);
}

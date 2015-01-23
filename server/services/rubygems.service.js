'use strict';

var https = require('https');

module.exports = {
  getGem: function(args) {
    var gemName = args.gemName;
    var onSuccess = args.onSuccess;
    var onGemNotFound = args.onGemNotFound || defaultOnGemNotFound;
    var onInvalidJSON = args.onInvalidJSON || defaultOnInvalidJSON;
    var onError = args.onError || defaultOnError;
    var endpoint = gemsEndpoint(gemName);

    var onResponse = function(response) {
      defaultOnResponse(response, onSuccess, onGemNotFound, onInvalidJSON);
    };

    https.get(endpoint, onResponse)
    .on('error', onError)
    .end();
  }
};

var errorMessages = {
  gemNotFound: 'This rubygem could not be found.',
  invalidJSON: 'Unexpected error from rubygems.org, response is invalid JSON'
};

function gemsEndpoint(gemName) {
  return "https://rubygems.org/api/v1/gems/" + gemName + ".json";
}

function defaultOnResponse(response, onSuccess, onGemNotFound, onInvalidJSON) {
  var responseData = '';
  response.on('data', function(chunk) {
    responseData += chunk;
  }).on('end', function() {
    try {
      var jsonData = JSON.parse(responseData);
      onSuccess(jsonData);
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

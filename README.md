# Rubygems Tracker

[![Circle CI](https://circleci.com/gh/ArturT/rubygems-tracker.svg?style=svg)](https://circleci.com/gh/ArturT/rubygems-tracker)

Track gems download statistics.

# Basic info

How to setup app on openshift.com
[https://blog.openshift.com/yeoman-serves-up-a-real-mean-stack/](https://blog.openshift.com/yeoman-serves-up-a-real-mean-stack/)

Installing the OpenShift Client Tools
[https://developers.openshift.com/en/managing-client-tools.html](https://developers.openshift.com/en/managing-client-tools.html)

# Usage

## Dependencies

    $ brew install mongodb

    # run mongodb
    $ mongod

    $ gem install compass

In case of error: "Could not find chromedriver" try:

    $ node node_modules/grunt-protractor-runner/node_modules/protractor/bin/webdriver-manager update

## Development

    $ npm install
    $ bower install

    # run server
    $ grunt serve

## Deployment

### Set up deployment repo

    $ cd dist
    $ git clone https://github.com/ArturT/rubygems-tracker-dist

### Deploy to OpenShift

    $ grunt build
    $ cd dist
    $ git commit -am "Relase new build"
    $ git push openshift master

    # story copy on github repo https://github.com/ArturT/rubygems-tracker-dist
    $ git push origin master

# Tips

## Debugging

    $ grunt node-inspector
    $ node --debug-brk server/config/seed.js
    # go to http://0.0.0.0:8080/debug?port=5858

## Tests

    $ grunt test:server
    $ grunt test:client
    $ grunt test:e2e

See config in `Gruntfile.js`.

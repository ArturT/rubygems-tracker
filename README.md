![Rubygems Tracker](client/assets/images/ruby-gem.png)

# Rubygems Tracker

[![Circle CI](https://circleci.com/gh/ArturT/rubygems-tracker.svg?style=svg)](https://circleci.com/gh/ArturT/rubygems-tracker)

Track gems download statistics.

# Demo

Actually it's production website where you can see statistics for one of my gem:

http://rubygemstracker-arturt.rhcloud.com/gems/knapsack

Feel free to add your gem there and start tracking stats for it. Enjoy!

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

### bin/publish

Use `bin/publish` to build project and publish it on production.

# Tips

## How to setup app on openshift.com

https://blog.openshift.com/yeoman-serves-up-a-real-mean-stack/

## Installing the OpenShift Client Tools

https://developers.openshift.com/en/managing-client-tools.html

## Debugging

    $ grunt node-inspector
    $ node --debug-brk server/config/seed.js
    # go to http://0.0.0.0:8080/debug?port=5858

## Tests

    $ grunt test:server
    $ grunt test:client
    $ grunt test:e2e

Run e2e tests with different port if you are running `grunt serve` at the same time.

    $ PORT=9001 grunt test:e2e

See config in `Gruntfile.js`.

## Keep OpenShift alive

Add to crontab on another server:

    55 * * * * curl -i -H "Accept: application/json" http://rubygemstracker-arturt.rhcloud.com/api/heartbeat > /dev/null 2>&1

# Rubygems Tracker

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

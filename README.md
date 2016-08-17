# CFB Scoreboard API [![Build Status](https://travis-ci.org/akeaswaran/cfb-scoreboard-api.svg?branch=master)](https://travis-ci.org/akeaswaran/cfb-scoreboard-api)

A simple college football JSON API that re-parses ESPN's internal college football API to strip unnecessary data and make it more useable (and useful!).

Built with [Node.js](http://nodejs.org/) and [Heroku](https://heroku.com/).

### NOTE: the historical data API hosted at https://collegefootballapi.com that this service uses has gone down. Please refrain from using historical data for now.

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku Toolbelt](https://toolbelt.heroku.com/) installed.

```sh
$ git clone git@github.com:akeaswaran/cfb-scoreboard-api.git # or clone your own fork
$ cd cfb-scoreboard-api
$ npm install
$ npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Deploying your own version to Heroku

```
$ heroku create
$ git push heroku master
$ heroku open
```
or

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

## API Documentation

See https://cfb-scoreboard-api.herokuapp.com/ for details on how to consume this API.

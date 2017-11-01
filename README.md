# dieta-farma-online

A barebones Ember.js app, which can easily be deployed to Heroku using the open source [Heroku Ember Buildpack](https://github.com/heroku/heroku-buildpack-emberjs).

**This app is deployed as a static app, if you would like to try a one click deploy of a FastBoot app check out [this branch](https://github.com/heroku/ember-js-getting-started/tree/fastboot).**

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with NPM)
* [Ember CLI](https://ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Running Locally

```sh
$ git clone
$ cd dieta-farma-online
$ yarn install
$ ember server
```
Your app should now be running on [localhost:4200](http://localhost:4200/).

## Deploying to Heroku

```sh
$ heroku create --buildpack https://codon-buildpacks.s3.amazonaws.com/buildpacks/heroku/emberjs.tgz
$ git push heroku master
$ heroku open
```

## Documentation

* [Heroku Ember.js Buildpack](https://github.com/heroku/heroku-buildpack-emberjs)
* [ember.js](https://emberjs.com/)
* [ember-cli](https://www.ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

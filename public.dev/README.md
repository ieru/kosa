# Javascript App Skeleton for use with [Brunch](http://brunch.io/)

Main languages are JavaScript,
[SASS for CSS pre-processing](http://sass-lang.com) and
[Handlebars for templating](http://handlebarsjs.com/).  Also included is [Backbone.Mediator](https://github.com/chalbert/Backbone-Mediator) for implementing Pub/Sub patterns.
Live-reload for automatic page-refreshes during development.  

## Installation

- Install node:  http://nodejs.org/
- Install Brunch: `sudo npm install -g brunch` 
- Install SASS: `sudo gem install sass`
- Run `brunch new <app name> -s https://github.com/damassi/Javascript-App-Skeleton` to download the app skeleton into your project folder.  
- cd into your new app folder
- Run `sudo npm install` to install any node dev dependencies listed in package.json. 

## Running Brunch
- To build your project run `brunch build`.  
- To continually watch your project folder changes and auto-compile, use `brunch watch`.
- If you want to start a simple server, run `brunch watch --server`

First install Brunch: `sudo npm install -g brunch` and then run `brunch new <app> -s https://github.com/damassi/Javascript-App-Skeleton` & then `npm install` and finally `brunch build`.  To continually watch for changes, use `brunch watch`.
See more info on the [official site](http://brunch.io)

## Unit Testing

The [Mocha](http://visionmedia.github.com/mocha/) test-suite is included by default.  Files located in `tests` that end with `_test.coffee` (or .js) are automatically packaged.  

To run tests independent of the browser, execute `brunch test`; to run them in the browser, navigate to `public/test/index.html`.  Test-related code is automatically recompiled during `brunch build` and `brunch watch`, and will automatically refresh the test page.

## Overview

    config.coffee
    README.md
    /app/
      /assets/
        index.html
        images/
      styles/
      helpers/
      config/
      events/
      utils/
      routers/
      models/
      /views/
        templates/

      Application.js
      initialize.js
    /test/
    /vendor/
      scripts/
        backbone.js
        jquery.js
        console-helper.js
        underscore.js
      styles/
        normalize.css
        helpers.css

* `config.coffee`  contains configuration of your app. You can set plugins /
languages that would be used here.
* `app/assets` contains images / static files. Contents of the directory would
be copied to `build/` without change.
Other `app/` directories could contain files that would be compiled. Languages,
that compile to JS (coffeescript, roy etc.) or js files and located in app are 
automatically wrapped in module closure so they can be loaded by 
`require('module/location')`.
* `app/models` & `app/views` contain base classes your app should inherit from.
* `test/` contains feature & unit tests.
* `vendor/` contains all third-party code. The code wouldn’t be wrapped in
modules, it would be loaded instantly instead.

This all will generate `public/` (by default) directory when `brunch build` or `brunch watch` is executed.

## Other
Versions of software the skeleton uses:

* jQuery 1.7.2
* Backbone 0.9.1
* Underscore 1.3.3
* HTML5Boilerplate 3.0.3

The license is [public domain](http://creativecommons.org/publicdomain/zero/1.0/).
Use it however you want.

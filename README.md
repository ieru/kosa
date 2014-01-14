### [KOS aggregator (kosa)](http://ieru.github.io/kosa)

A lightweight aggregator of Knowledge Organization Systems (KOS)  

![Architecture](https://raw.github.com/ieru/kosa/master/kosa.png)


### Index

- [Demo](#demo)  
- [State](#state)  
- [Architecture](#architecture)  
- [Requirements](#requirements)  
- [Installation](#installation-on-debian--ubuntu)  
- [Post-Installation](#postinstallation)  
- [Changing Javascript, HTML and CSS](#javascript-templates--css-changes)  
- [Troubleshooting](#troubleshooting)  
- [Documentation and API Access](#documentation-and-api-access)  
- [Extra Features](#extra-features)  
- [Resources](#resources)  
- [Author](#author)  
- ['Licence'](#license)  

### [Demo](http://kos.appgee.net)

The current project snapshot may be seen [Here](http://kos.appgee.net)

### Status  

[![Build Status](https://travis-ci.org/ieru/kosa.png?branch=master)](https://travis-ci.org/ieru/kosa) [![Code Climate](https://codeclimate.com/github/ieru/kosa.png)](https://codeclimate.com/github/ieru/kosa) [![Coverage Status](https://coveralls.io/repos/ieru/kosa/badge.png)](https://coveralls.io/r/ieru/kosa)

### Architecture

- Lightweight Backend ~ 300 LOC
- MVC Frontend (BackboneJs)
- RESTful APi
- Supports almost any database. Relational | Triplestore | Graph
- Scalable
- Indexable Database: PostgeSQL | ElasticSearch
- Supports Cache: Filesystem | Memcached
- Touchscreen / Mobile friendly. Responsive HTML5


### Requirements

- Ruby v1.9+
- Java Application Server (e.g Tomcat, GlashFish, Jetty, JBoss, etc. )


### Installation on Debian / Ubuntu

Visit this [Wiki page](//github.com/ieru/kosa/wiki/Installation-on-Debian---Ubuntu-Linux.-Recommended)

### Installation on Mac OS X

To be done.

### Installation on Windows

To be done.

### Installation on a SaaS (e.g AWS, Heroku, etc.)

To be done.

### Postinstallation (Installing a Production or Devel. Server) 

You can get more info on this [Wiki Page]()

### Javascript, templates & css changes

Since Front and Back are now completely separated, to modify html, javascript or
styles follow these steps:  

    
Download and install [node.js](http://nodejs.org/download/)
    
    $ sudo npm install -g brunch
    
    $ cd __YOUR_SITE_DIR__/public.dev
    $ ./deploy.sh

    Compiling assets ...
    11 Nov 05:57:39 - info: compiled 30 files and 2 cached into 7 files, copied 14 in 3905ms
    Deploying assets ...
    Done. Created ./../public
    
    ( refresh your browser )

### Troubleshooting

[Troubleshooting](https://github.com/ieru/kosa/wiki/Troubleshooting)

### Documentation and API access

[API](https://github.com/ieru/kosa/wiki/Kosa-RESTful-API)


### Extra Features

Pluggable databases:
- Sesame
- SQLite
- PostgreSQL 
- Casandra
- MongoDB
- RedStore
- 4-store
- Virtuoso
- AllegroGraph

Caches:
- FileStore (default)
- Memcached

Indexers:
- Sesame + [Postgres - uSeekM Indexer](https://dev.opensahara.com/projects/useekm)
- Sesame + [ElasticSearch - uSeekM Indexer](https://dev.opensahara.com/projects/useekm)


### Resources

- [HTML5 Canvas](http://www.w3.org/html/logo/)
- [Ruby](https://www.ruby-lang.org)
- [Sinatra](http://www.sinatrarb.com/)
- [Sesame](http://www.openrdf.org/)
- [PostgreSQL](), [Casandra](), [MongoDB](), [RedStore](), [4-store](), [AllegroGraph]()
- [Backbonejs](http://backbonejs.org/)
- [Handlebarjs](http://handlebarsjs.com/)
- [SASS](http://sass-lang.com/)
- [Bootstrap 3.0](http://getbootstrap.com/)
- [Memcached](http://memcached.org/)
- [UseekM Indexer](https://dev.opensahara.com/projects/useekm)
- [ElasticSearch](http://www.elasticsearch.org/)


### Author

University of Alcal�

### 'License'

This is free and unemcumbered software released into the public domain. For more information, see the accompanying UNLICENSE file.

If you're unfamiliar with public domain, that means it's perfectly fine to start with this skeleton and code away, later relicensing as you see fit.



### [KOS aggregator (kosa)](http://ieru.github.io/kosa)

A lightweight aggregator of Knowledge Organization Systems (KOS)  

![Architecture](https://raw.github.com/ieru/kosa/master/kosa.png)


### Index

- [Demo](#demo)  
- [State](#state)  
- [Architecture](#architecture)  
- [Requirements](#requirements)  
- [Installation](#installation-on-debian--ubuntu)  
- [Running a Production Server](#running-on-a-development-server-linux--mac-os--windows)  
- [Changing Javascript, HTML and CSS](#javascript-templates--css-changes)  
- [Troubleshooting](#troubleshooting)  
- [Documentation and API Access](#documentation-and-api-access)  
- [Extra Features](#extra-features)  
- [Resources](#resources)  
- [Author](#author)  
- ['Licence'](#license)  

### Demo

The current project snapshot may be seen [here](http://kos.appgee.net)

### State  

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

Visit [this Wiki page](//github.com/ieru/kosa/wiki/Installation-on-Debian---Ubuntu-Linux-(Recommended))

### Installation on Mac OS X

```
TBD
```

### Installation on Windows

```
TBD
```

### Installation on a PaaS (e.g AWS, Heroku, etc.)

**Heroku**  
```
TBD
```

**Amazon Web Services**
```
TBD
```

### Running on a Development Server (Linux / Mac OS / Windows)

```
$ sudo rackup config.ru
( use '$ sudo rvm all do rackup config.ru', if you are using rvm )
...
[2013-11-04 23:22:27] INFO  WEBrick 1.3.1
[2013-11-04 23:22:27] INFO  ruby 1.9.2 (2012-04-20) [x86_64-darwin12.5.0]
[2013-11-04 23:22:27] INFO  WEBrick::HTTPServer#start: pid=53704 port=4568
```

Now, open your browser and type ````http://localhost:4568````

### Running on a Production Server (Debian / Ubuntu Linux)

A good option for Linux servers is to use NGINX + Passenger. You can deploy 
both servers by running the command below

    # copy-and-paste all in one line
    
    curl -L https://raw.github.com/julianromerajuarez/ubuntu\
    -debian-nginx-passenger-installer/master/install.sh | bash 

You can get more information about this script [here](https://github.com/julianromerajuarez/ubuntu-debian-nginx-passenger-installer)

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



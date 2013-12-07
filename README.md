### [KOS aggregator (kosa)](http://ieru.github.io/kosa)

A lightweight aggregator of Knowledge Organization Systems (KOS)

### Demo

The current project snapshot may be seen [here](http://kos.appgee.net) (Open-Alpha version)

[![Build Status](https://travis-ci.org/ieru/kosa.png?branch=master)](https://travis-ci.org/ieru/kosa) [![Code Climate](https://codeclimate.com/github/ieru/kosa.png)](https://codeclimate.com/github/ieru/kosa) [![Coverage Status](https://coveralls.io/repos/ieru/kosa/badge.png)](https://coveralls.io/r/ieru/kosa)

### Requirements

- Ruby
- Sesame + Indexer

### Optional requirements

- SQLite, PostgreSQL, Casandra, MongoDB, RedStore, 4-store
- Virtuoso, AllegroGraph
- Memcached (by default FileStore-Cache is used)

### Installation


- Install ruby

```
$ ruby -v
ruby 1.9 ...

```

- Install a database (Sesame by default)

```
TBD
```

- Fill your database with some RDF dummy data (to test the endpoint)

```
TBD
```

- Install Kosa:

```
$ git clone https://github.com/ieru/kosa.git
$ cd kosa
```

- Install required gems with the command:

```

(use 'rvm all do gem install __GEMS BELOW__')  

$ sudo gem install bundle bundler sinatra nokogiri rest-client json dm-core dm-sqlite-adapter rdf
$ sudo gem install rdf-aggregate-repo rdf-isomorphic rdf-json rdf-microdata rdf-n3 rdf-rdfa
$ sudo gem install rdf-rdfxml rdf-turtle rdf-trig rdf-xsd rdf-4store json-ld linkeddata
$ sudo gem install sparql sinatra-respond_to sinatra-flash rmagick sparql-client
```

- Create 'bundle' 

```
( from kosa directory )
$ sudo bundle install

(or '$ sudo rvm all do bundle install' -- if you use rvm -- )
```

### Running on a Development server

- Since the server has been installed using Rack, just type:

```
$ sudo rackup config.ru
( use '$ sudo rvm all do rackup config.ru', if you are using rvm )
...
[2013-11-04 23:22:27] INFO  WEBrick 1.3.1
[2013-11-04 23:22:27] INFO  ruby 1.9.2 (2012-04-20) [x86_64-darwin12.5.0]
[2013-11-04 23:22:27] INFO  WEBrick::HTTPServer#start: pid=53704 port=4568


Now, open your browser and write:

http://localhost:4568

```

### Running on a Production Server


A good option for Linux servers is to use NGINX + Passenger. You can deploy 
both servers by running the command below (for a Debian/ Ubuntu users)

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

- [Troubleshooting](https://github.com/ieru/kosa/wiki/Troubleshooting)

### Documentation and API access

- [API](https://github.com/ieru/kosa/wiki/RESTful-API-documentation)

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

University of Alcala

### 'License'

This is free and unemcumbered software released into the public domain. For more information, see the accompanying UNLICENSE file.

If you're unfamiliar with public domain, that means it's perfectly fine to start with this skeleton and code away, later relicensing as you see fit.



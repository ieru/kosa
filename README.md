### [KOSaggregator]()

A lightweight aggregator of Knowledge Organization Systems (KOS)

### Demo

The current project snapshot may be seen [here](http://kos.appgee.net) (Open-Alpha version)

[![Build Status](https://travis-ci.org/ieru/kosa.png?branch=master)](https://travis-ci.org/ieru/kosa) [![Code Climate](https://codeclimate.com/github/ieru/kosa.png)](https://codeclimate.com/github/ieru/kosa)

### Requirements

- Ruby
- ImageMagick 
- 4-store
- PostgreSQL & Heroku PostgreHQ, Casandra, MongoDB, RedStore, Sesame (Optional, Exchangeable)
- SQLite, Virtuoso, AllegroGraph (Optional, Exchangeable)

### Installation


- First step is to install a graph-based database: 4-store has been used
- Intallation can be accomplished from a debian-like system running: 

For more info on installing 4store: [4store Wiki](http://4store.org/trac/wiki/Install)

```
$ sudo apt-get install 4-store
```

- on Mac systems : 


```
(if using MacPorts)  
$ sudo port install 4-store  

```

- Create a 4store database, 

```
$ sudo 4s-backend-setup testDB
$ sudo 4s-backend testDB
```

- Run the database, listening on port 8008 (to do so, just type: )

```
$ sudo 4s-httpd -p 8008 testDB  

(if you want to test your installed database, point your browser to http://localhost:8008/test 
You will access an SPARQL endpoint)
```

- Install ruby on your machine, or ensure you have it installed

```
$ ruby -v
ruby 1.9 ...

```

- Fill your database with some RDF dummy data (to test the endpoint)

```
( in kosa directory: )

$ wget http://www.cropontology.org/ontology/CO_010/Germplasm/nt -O co_010_ontology.rdf  

( ruby _loader.rb <ontology_name> <file_to_load> )  

$ ruby _loader.rb co_010 co_010_ontology.rdf
...
...
<http://www.cropontology.org/rdf/CO_010%3A0000000> <http://www.w3.org/1999/02/22-rdf-syntax-ns#...
<http://www.cropontology.org/rdf/CO_010%3A0000000> <http://www.w3.org/2000/01/rdf-schema#label...

Loading ./co_010_ontology.rdf into co_010 in 4store

...
...

```

- Clone, or download a zip of this repository. Clone may be done using:

```
$ git clone https://github.com/ieru/kosa.git
$ cd kosa
```

- Before installing gems and runnig bundle install; install ImageMagick

For Mac Os:  
[rmagick installation fort MacOs](http://blog.paulopoiati.com/2013/01/28/installing-rmagick-in-mac-os-x-mountain-lion-with-homebrew/)

For most Systems:  
Download and install your OS version 
Get more Info, and troubleshoouing, at vendor's link:
http://www.imagemagick.org/script/binary-releases.php

- Install required gems with the command:

```

Note: if you are using MacOs + RVM run this command first:

$ sudo rvm osx-ssl-certs update all


(use 'rvm all do gem install sinatra .....' , instead, if you have rvm installed)  

$ sudo gem install bundle bundler sinatra nokogiri rest-client json dm-core dm-sqlite-adapter rdf
$ sudo gem install rdf-aggregate-repo rdf-isomorphic rdf-json rdf-microdata rdf-n3 rdf-rdfa
$ sudo gem install rdf-rdfxml rdf-turtle rdf-trig rdf-xsd rdf-4store json-ld linkeddata
$ sudo gem install sparql sinatra-respond_to sinatra-flash rmagick sparql-client
```

- Install bundle using: (it may be necessary to remove the Gemfile.lock file to rebuild the previous build)

```
( from cloned KOS directory )
$ sudo bundle install
(or '$ sudo rvm all do bundle install' -- if you use rvm -- )
```

- Since the server has been installed using Rack, to run it, just type:

```
$ sudo rackup config.ru
( use '$ sudo rvm all do rackup config.ru', if you are using rvm )
...
[2013-11-04 23:22:27] INFO  WEBrick 1.3.1
[2013-11-04 23:22:27] INFO  ruby 1.9.2 (2012-04-20) [x86_64-darwin12.5.0]
[2013-11-04 23:22:27] INFO  WEBrick::HTTPServer#start: pid=53704 port=4568


Now, open your browser and write:

http://localhost:4568

..Voila..

```
### javascript, templates & css changes

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

### Todo List

[TODO-LIST](https://github.com/ieru/kosa/wiki/TODO-LIST)

### API documentation

[API-documentation](https://github.com/ieru/kosa/wiki/RESTful-API-documentation)

### Resources

- [HTML5 Canvas](http://www.w3.org/html/logo/)
- [Ruby](https://www.ruby-lang.org)
- [Sinatra](http://www.sinatrarb.com/)
- [4-store](http://4store.org/)
- [SQLite]() 
- [PostgreSQL]() & [Heroku]() PostgreHQ,[Casandra](), [MongoDB](), [RedStore](), [Sesame](), [AllegroGraph]()
- [Backbonejs](http://backbonejs.org/)
- [Handlebarjs](http://handlebarsjs.com/)
- [SASS](http://sass-lang.com/)
- [Bootstrap 3.0](http://getbootstrap.com/)

### Author

University of Alcala

### 'License'

This is free and unemcumbered software released into the public domain. For more information, see the accompanying UNLICENSE file.

If you're unfamiliar with public domain, that means it's perfectly fine to start with this skeleton and code away, later relicensing as you see fit.



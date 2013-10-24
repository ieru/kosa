## KOSaggregator

A lightweight aggregator of Knowledge Organization Systems (KOS)

## Demo

A current live snapshot can be seen on http://kos.appgee.net (Open-Alpha version)

[![Build Status](https://travis-ci.org/ieru/kosa.png?branch=master)](https://travis-ci.org/ieru/kosa)

## Technologies

- Ruby Sinatra
- 4-store Database
- Responsive D3.js (svg graphs)
- Responsive Bootstrap 3 template

## Installation


- First step is to install a graph-based database: 4-store has been used
- Intallation can be accomplished from a debian-like system running: 

( More info on installing 4store, here:
http://4store.org/trac/wiki/Install

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
<http://www.cropontology.org/rdf/CO_010%3A0000000> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.w3.org/2004/02/skos/core#Concept> .
<http://www.cropontology.org/rdf/CO_010%3A0000000> <http://www.w3.org/2000/01/rdf-schema#label> "GCP germplasm ontology"@en .

Loading ./co_010_ontology.rdf into co_010 in 4store

...
(you may see a 400 Error here. Its not important)
...

```

- Clone, or download a zip of this repository. Clone may be done using:

```
$ git clone https://github.com/ieru/kosa.git
$ cd kosa
```

- Before installing gems and runnig bundle install; install ImageMagick

( Download and install your OS version. More info at vendor's link:
http://www.imagemagick.org/script/binary-releases.php

( For MacOs the easiest way is 
1. go http://www.macports.org/install.php and download the .dmg file
2. Double-click it
3. $ sudo port -v selfupdate
4. $ sudo port install ImageMagick )

- Install required gems with the command:

```
# (use 'rvm all do gem install sinatra .....' , instead, if you have rvm installed)  

$ sudo gem install sinatra nokogiri rest-client json dm-core dm-sqlite-adapter rdf
$ sudo gem install rdf-aggregate-repo rdf-isomorphic rdf-json rdf-microdata rdf-n3 rdf-rdfa
$ sudo gem install rdf-rdfxml rdf-turtle rdf-trig rdf-xsd rdf-4store json-ld linkeddata
$ sudo gem install sparql sinatra-respond_to sinatra-flash rmagick sparql-client
```

- Install bundle using: (it may be necessary to remove the Gemfile.lock file to rebuild the previous build)

```
( from cloned kosa directory )
$ sudo bundle install
(or '$ sudo rvm all do bundle install' -- if you use rvm -- )
```

- Since the server has been installed using Rack, to run it, just type:

```
$ sudo rackup -p <your_port_number> config.ru
( use '$ sudo rvm all do rackup -p <your_port_number> config.ru', if you are using rvm )
```

## Troubleshooting

https://github.com/ieru/kosa/wiki/Troubleshooting

## Todo List

https://github.com/ieru/kosa/wiki/TODO-LIST

## API documentation

https://github.com/ieru/kosa/wiki/RESTful-API-documentation

## Licence

Copyright University of Alcala. Licenced under GPL/GNU version 2 Licence.  
RDF importer on this application is based on RDF:Distiller gem. Refer to https://github.com/gkellogg/rdf-distiller for Licence info.


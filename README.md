## KOSaggregator

A lightweight aggregator of Knowledge Organization Systems (KOS)

## Demo

A current live snapshot can be seen on http://kos.appgee.net (Open-Alpha version)

[![Build Status](https://travis-ci.org/ieru/kosa.png?branch=master)](https://travis-ci.org/ieru/kosa)

## Installation


- First step is to install a graph-based database: 4-store has been used
- Intallation can be accomplished from a debian-like system running: 

```
apt-get install 4-store
```

- on Mac systems : 

```
port install 4-store
```

- on RedHat Like systems: 

```
yum install 4-store
```

- After installing the database, configure it to listen on port 8008

- Clone, or download a zip of this repository. Clone may be done using:

```
git clone https://github.com/ieru/kosa.git
cd kosa
```

- Install ruby on your machine
- Install required gems with the command (you may need more Gems):

```
# (use 'rvm all do gem install sinatra ...' , instead, if you have rvm installed)
gem install sinatra rubygems nokogiri rest_client json dm-core dm-sqlite-adapter, rdf
gem install rdf-aggregate-repo, rdf-isomorphic, rdf-json, rdf-microdata, rdf-n3, rdf-rdfa
gem install rdf-rdfxml, rdf-turtle, rdf-trig, rdf-xsd, rdf-4store, json-ld, linkeddata
gem install sparql, sinatra-respond_to, sinatra-flash, rmagick, sparql-client
```

- Install bundle using: (it may be necessary to remove the Gemfile.lock file to rebuild the previous build)

```
bundle install
(or 'rvm all do bundle install' -- if you use rvm -- )
```

- Since the server has been installed using Rack, to run it, just type:

```
rackup -p <your_port_number> config.ru
( use 'rvm all do rackup -p <your_port_number> config.ru', if you are using rvm )
```

## Todo List

https://github.com/ieru/kosa/wiki/TODO-LIST

## API documentation

https://github.com/ieru/kosa/wiki/RESTful-API-documentation

## Licence

Copyright University of Alcala. Licenced under GPL/GNU version 2 Licence.  
RDF importer on this application is based on RDF:Distiller gem. Refer to https://github.com/gkellogg/rdf-distiller for Licence info.


## KOSaggregator

A lightweight aggregator of Knowledge Organization Systems (KOS)

## Demo

A current live snapshot can be seen on http://kos.appgee.net (Open-Alpha version)

[![Build Status](https://travis-ci.org/ieru/kosa.png?branch=master)](https://travis-ci.org/ieru/kosa)

## Intallation


- first step is to install a graph-based database: 4-store has been used
- intallation can be accomplished from a debian-like system running: 

```
apt-get install 4-store
```

- on Mac systems : 

```
port install 4-store
```

- on RedHat Like : 

```
yum install 4-store
```

- After installing the database, configure it to listen to port 8008

- clone or download o zip of this repository. Clone can be done using

```
git clone https://github.com/ieru/kosa.git
cd kosa
```

- install ruby on your machine
- install required gems with the command (you may need more gems):

```
# (use 'rvm all do gem install sinatra ...' , instead, if you have rvm installed)
gem install sinatra rubygems nokogiri rest_client json dm-core dm-sqlite-adapter, rdf , rdf-aggregate-repo, rdf-isomorphic, rdf-json, rdf-microdata, rdf-n3, rdf-rdfa, rdf-rdfxml, rdf-turtle, rdf-trig, rdf-xsd, rdf-4store, json-ld, linkeddata, sparql-client, sparql, sinatra-respond_to, sinatra-flash, rmagick
```

- install bundle, using: (it may be necessary to remove the Gemfile.lock file, ro rebuild the bundle)

```
bundle install
(or 'rvm all do bundle install' -- if you use rvm -- )
```

- Since the server has been installed using Rack, to run it, just type:

```
rackup -p <your_por_number> config.ru
( use 'rvm all do rackup -p <your_por_number> config.ru', if you are using rvm )
```

## LICENCE

Copyright University of Alcala. Licenced under GPL/GNU version 2 Licence.  
RDF importer on this application is based on RDF:Distiller gem. Refer to https://github.com/gkellogg/rdf-distiller for Licence info




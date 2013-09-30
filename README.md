# kosa

A lightweight aggregator of Knowledge Organization Systems (KOS)

## Demo

A current live snapshot can be seen on http://kos.appgee.net (Open Alpha)

[![Build Status](https://travis-ci.org/ieru/kosa.png?branch=master)](https://travis-ci.org/ieru/kosa)

## Intallation


- first step is to install a graph-based database: 4-store has been used
- intallation can be accomplished from a debian-like system running: 

```
apt-get install 4-store
```

- clone or download o zip of this repository. Clone can be done using

```
git clone git@github.com:ieru/kosa.git
cd kosa
```

- install ruby on your machine
- install required gems with the command:

``` 
gem install sinatra rubygems nokogiri rest_client json dm-core dm-sqlite-adapter
```

- run rest_api.rb using

```
  ruby rest_api.rb
```

or (if you have rvm installed)

```
  rvm all do ruby rest_api.rb
```


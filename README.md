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

##### Installation on GNU/Linux (Debian / Ubuntu)

(tested to work with uSeekM 1.2.0-a5 on a debian/squeezy platform.)


**Install ruby**

```
$ ruby -v
ruby 1.9 ...
TBD
```


**Install Database and Indexer (Sesame + Postgres by default)**


Install java JDK and Tomcat6 servlet container from APT repositories:
```
$ sudo apt-get install sun-java6-jdk tomcat6-admin tomcat6-common tomcat6-examples tomcat6
```

Install PostgreSQL database
```
$ sudo apt-get install postgresql-9.1 postgresql-contrib-9.1
```

Create a database named 'useekm':
```
$ sudo -u postgres createdb useekm
```

Download webapp archives (WARs) to be deployed under Tomcat6 (we choose version 1.2.0-a5):
```
$ sudo mkdir -p ~/packages
$ cd ~/packages
$ sudo wget --no-check-certificate https://dev.opensahara.com/nexus/content/repositories/re\
leases/com/opensahara/useekm-http-server/1.2.0-a5/useekm-http-server-1.2.0-a5.war

$ sudo wget --no-check-certificate https://dev.opensahara.com/nexus/content/repositories/re\
leases/com/opensahara/useekm-http-workbench/1.2.0-a5/useekm-http-workbench-1.2.0-a5.war
```

Copy and rename archives into Tomcat6's webapp directory (requires restart to take effect). 
Afterwards, visit Tomcat's admin interface, at ````http://localhost:8080/manager/html```` and 
verify that the archives are properly deployed and hosted under the appropriate 
URL prefix (i.e. ````/openrdf-sesame```` and ````/openrdf-workbench````):
```
# cp ~/packages/useekm-http-workbench-1.2.0-a5.war /var/lib/tomcat6/webapps/openrdf-workbench.war
# cp ~/packages/useekm-http-server-1.2.0-a5.war    /var/lib/tomcat6/webapps/openrdf-sesame.war
# /etc/init.d/tomcat6 restart
```

Now a new RDF repository should be created with a set of minimal configuration options. 
Let's name it "geoknow":
```
# mkdir -p /var/opt/useekm/geoknow
```

Create a configuration file for your repository at ````/var/opt/useekm/geoknow/config.xml```` 
by editing the following template:
```
<beans xmlns="http://www.springframework.org/schema/beans" 
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
    xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-2.5.xsd">

    <!-- The id "repository" is mandatory! -->
    <bean id="repository" class="org.openrdf.repository.sail.SailRepository">
        <constructor-arg>
            <bean class="com.useekm.indexing.IndexingSail">
                <constructor-arg ref="sail" />
                <constructor-arg ref="indexerSettings" />
            </bean>
        </constructor-arg>
    </bean>

    <!-- This example uses the NativeStore as the underlying sail, you could also use the MemoryStore -->
    <bean id="sail" class="org.openrdf.sail.nativerdf.NativeStore" />

    <!-- Please customize the indexer settings: -->
    <bean id="indexerSettings" lazy-init="true" class="com.useekm.indexing.postgis.PostgisIndexerSettings">
        <property name="defaultSearchConfig" value="simple" />
        <property name="dataSource" ref="pgDatasource" />
        <property name="matchers">
            <list>
                <!-- CUSTOMIZE: list all the predicates that need indexing (text and/or geo): -->
                <bean class="com.useekm.indexing.postgis.PostgisIndexMatcher">
                    <property name="predicate" value="http://www.w3.org/2000/01/rdf-schema#label" />
                    <property name="searchConfig" value="simple" />
                </bean>
                <bean class="com.useekm.indexing.postgis.PostgisIndexMatcher">
                    <property name="predicate" value="http://www.opengis.net/ont/geosparql#asWKT" />
                </bean>
            </list>
        </property>
        <!-- You can add additional configuration, such as index partitions to optimize performance. See the documentation. -->
    </bean>

    <bean id="pgDatasource" lazy-init="true" class="org.apache.commons.dbcp.BasicDataSource" destroy-method="close">
        <property name="driverClassName" value="org.postgresql.Driver"/>
        <property name="url" value="jdbc:postgresql://localhost:5432/useekm"/>    <!-- CUSTOMIZE! -->
        <property name="username" value="postgres"/>                              <!-- CUSTOMIZE! -->
        <property name="password" value="postgres"/>                              <!-- CUSTOMIZE! -->
    </bean>
</beans>
```

Finally, change ownership of the directories that expect server output (logs etc.):
```
# chown root:tomcat6 -R /usr/share/tomcat6/.aduna/openrdf-sesame
# chmod 0775         -R /usr/share/tomcat6/.aduna/openrdf-sesame
```

Restart Tomcat6 and visit ````http://localhost:8080/openrdf-workbench````.  

You should be able to create a new server instance by using ````http://127.0.0.1:8080/openrdf-sesame```` 
as the address. Note that this is a local (to the Tomcat instance) address.
Afterwards, you should be able to create a new repository named 'geoknow'. Specify the 
server's absolute file path of the configuration file (that is ````/var/opt/useekm/geoknow/config.xml````)



**Fill your database with some RDF dummy data (to test the endpoint)**

```
TBD
```

**Install Kosa**

```
$ git clone https://github.com/ieru/kosa.git
$ cd kosa
```

Install required gems
```
(use 'rvm all do gem install __GEMS BELOW__')  

$ sudo gem install bundle bundler sinatra nokogiri rest-client json dm-core dm-sqlite-adapter rdf
$ sudo gem install rdf-aggregate-repo rdf-isomorphic rdf-json rdf-microdata rdf-n3 rdf-rdfa
$ sudo gem install rdf-rdfxml rdf-turtle rdf-trig rdf-xsd rdf-4store json-ld linkeddata
$ sudo gem install sparql sinatra-respond_to sinatra-flash rmagick sparql-client
```

Create 'bundle' 
```
( from Kosa directory )
$ sudo bundle install

(or '$ sudo rvm all do bundle install' -- if you use rvm -- )
```

##### Installation on MAC OS

```
TBD
```

##### Installation on Windows

```
TBD
```

### Running on a Development Server

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



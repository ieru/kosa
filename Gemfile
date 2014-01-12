source 'https://rubygems.org'

# Specify your gem's dependencies in github-lod.gemspec
gemspec :name => ""

# Include non-released gems first
gem 'rdf',                :git => "git://github.com/ruby-rdf/rdf.git"        # , :tag => '1.0.10'
gem 'rdf-aggregate-repo', :git => "git://github.com/ruby-rdf/rdf-aggregate-repo.git", :require => "rdf/aggregate_repo"
gem 'rdf-isomorphic',     :git => "git://github.com/ruby-rdf/rdf-isomorphic.git", :require => "rdf/isomorphic"
gem 'rdf-json',           :git => "git://github.com/ruby-rdf/rdf-json.git", :require => "rdf/json"
gem 'rdf-microdata',      :git => "git://github.com/ruby-rdf/rdf-microdata.git", :require => "rdf/microdata"
gem 'rdf-n3',             :git => "git://github.com/ruby-rdf/rdf-n3.git", :require => "rdf/n3"
gem 'rdf-rdfa',           :git => "git://github.com/ruby-rdf/rdf-rdfa.git", :require => "rdf/rdfa"
gem 'rdf-rdfxml',         :git => "git://github.com/ruby-rdf/rdf-rdfxml.git", :require => "rdf/rdfxml"
gem 'rdf-turtle',         :git => "git://github.com/ruby-rdf/rdf-turtle.git", :require => 'rdf/turtle'
gem 'rdf-trig',           :git => "git://github.com/ruby-rdf/rdf-trig.git", :require => "rdf/trig"
gem 'rdf-xsd',            :git => "git://github.com/ruby-rdf/rdf-xsd.git", :require => "rdf/xsd"
gem 'rdf-4store',         :git => "git://github.com/fumi/rdf-4store.git"
gem 'json-ld',            :git => "git://github.com/ruby-rdf/json-ld.git", :require => 'json/ld'
gem 'linkeddata',         :git => "git://github.com/ruby-rdf/linkeddata.git"
gem 'sparql-client',      :git => "git://github.com/ruby-rdf/sparql-client.git"
gem 'sparql',             :git => "git://github.com/ruby-rdf/sparql.git"
gem 'sinatra-respond_to', :git => "git://github.com/gkellogg/sinatra-respond_to.git", :require => 'sinatra/respond_to'
gem 'rdf-sesame', 	  :git => "git://github.com/ruby-rdf/rdf-sesame.git"

gem 'sinatra'
gem 'rubygems-bundler'

gem 'sanitize'

gem 'rack-flash3', require: 'rack/flash'
gem 'warden'
gem 'data_mapper'
gem 'dm-sqlite-adapter'
gem 'bcrypt-ruby'
gem 'scrypt'

gem 'dalli'

# Persistence Adapters ##
#
# SQLite3, PostgreSQL, Heroku
# gem 'rdf-do'
# gem 'do_sqlite3'
#
# AllegroGraph
# gem 'rdf-agraph'
#
# 4Store
# gem 'rdf-4store'
# place more  adapters below ..


gem 'rdf-raptor'
gem 'coveralls', require: false

gem 'fileutils'

# yajl gem increases JSON parse ~ 1.9x -> https://github.com/brianmario/yajl-ruby
gem 'yajl-ruby'

gem 'rack-test'

group :production do
end

group :development, :test do
  # gem 'shotgun'
  # gem "wirble"
  # gem "syntax"
  # gem 'rspec'
  # gem 'rack-test'
  # gem "redcarpet"
  
  gem "debugger" if RUBY_VERSION > "1.9"
  gem "rake"
end


# group :development, :test do
#   gem 'awesome_print'
#   gem 'racksh'
#   gem 'debugger' if RUBY_VERSION > '1.9'
#   gem 'rake'
#   gem 'pry'
#   gem 'pry-debugger'
# end


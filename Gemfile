source 'https://rubygems.org'

# Specify your gem's dependencies in github-lod.gemspec
gemspec :name => ""

gem 'rubygems-bundler'

# Include non-released gems first
gem 'rdf',                :git => "git://github.com/ruby-rdf/rdf.git"
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

gem 'rdf-raptor'
gem 'rest-client'
gem 'fileutils'

# database adapters
gem 'dm-core'
gem 'dm-migrations'
gem 'dm-sqlite-adapter'

# yajl gem increases JSON parse ~ 1.9x -> https://github.com/brianmario/yajl-ruby
gem 'json'
gem 'yajl-ruby'

group :production do
  
  # temporal
  gem 'better_errors'
  gem 'binding_of_caller'

end

group :development, :test do

  gem 'better_errors'
  gem 'binding_of_caller'
  
  gem 'shotgun'
  gem "wirble"
  gem "syntax"
  gem "redcarpet"
  gem "debugger" if RUBY_VERSION > "1.9"
  gem "rake"
end

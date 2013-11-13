#!/usr/bin/env ruby
require 'rdf'
require 'rdf/4store'
require 'rdf/ntriples'
#require 'data_objects'
#require 'do_sqlite3'
#require 'do_postgres'
#require 'rdf/do'
require 'fileutils'

# ruby import.rb

if ARGV[0] != "--confirm"
  puts "use ../drop.db.sh instead"
  exit
end

repo = RDF::FourStore::Repository.new('http://127.0.0.1:8008/')
# repo = RDF::DataObjects::Repository.new('sqlite3:kosa.db')
# repo = RDF::DataObjects::Repository.new 'postgres://postgres@server/database'
# heroku_repo = RDF::DataObjects::Repository.new(ENV['DATABASE_URL'])

count = repo.count
puts "Droping your enire database ... (this may take some time)"
repo.clear!

# How many statements did we have?
puts "Total records in database:"
puts "Before Drop: " + count.to_s + ", After Drop: " + repo.count.to_s

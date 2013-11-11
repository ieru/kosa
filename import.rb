require 'rdf'
require 'rdf/ntriples'
require 'data_objects'
require 'do_sqlite3'
require 'rdf/do'

repo = RDF::DataObjects::Repository.new('sqlite3:///kosa.db')
# repo = RDF::DataObjects::Repository.new 'postgres://postgres@server/database'
# heroku_repo = RDF::DataObjects::Repository.new(ENV['DATABASE_URL'])
count = repo.count
puts "Loading data... (this may take some time)"
repo.load('./co_010.rdf')

time = RubyProf::GraphPrinter.new(result)

# How many statements did we have?
puts "Total records in database:"
puts "Before import: " + count.to_s + ", After import: " + repo.count.to_s

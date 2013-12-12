# #!/usr/bin/env ruby -EBINARY
require 'rdf'
require 'linkeddata'
#require 'rdf/4store'
require 'rdf/sesame'
require 'rdf/ntriples'
#require 'data_objects'
#require 'do_sqlite3'
#require 'do_postgres'
#require 'rdf/do'
require 'fileutils'

# config 
# Onntology = 'KOS' # <-- agrovoc
# Ontology = 'cropontology'
# Ontology = 'oedunet'
Ontology = 'MolGermMapper'

# ruby import.rb

if ARGV[0].nil?
  puts "syntax: import.rb <rdf file | rdf web link>"
  exit
end



url = "http://127.0.0.1:8888/openrdf-sesame/repositories/#{Ontology}"
repo = RDF::Sesame::Repository.new(url)

# repo = RDF::FourStore::Repository.new('http://127.0.0.1:8008/')
# repo = RDF::DataObjects::Repository.new('sqlite3:kosa.db')
# repo = RDF::DataObjects::Repository.new 'postgres://postgres@server/database'
# heroku_repo = RDF::DataObjects::Repository.new(ENV['DATABASE_URL'])

# repo.clear!

count = repo.count
puts "Loading data... (this may take some time)"

RDF::Reader.open(ARGV[0]) do |reader|
  reader.each_statement do |statement|
    repo.insert(statement)
  end
end

# repo.load('./co_010.rdf')

# How many statements did we have?
puts "Total records in database:"
puts "Before import: " + count.to_s + ", After import: " + repo.count.to_s

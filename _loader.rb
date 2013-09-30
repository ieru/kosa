#!/usr/bin/env ruby
require 'rubygems'
require 'rest_client'

filename = './index.rdf'
graph    = 'http://source.data.gov.uk/data/reference/organogram-co/2010-10-31/index.rdf'
endpoint = 'http://localhost:8008/data/'

puts File.read(filename)
puts "Loading #{filename} into #{graph} in 4store"
response = RestClient.put endpoint + graph, File.read(filename), :content_type => 'application/rdf+xml'
puts "Response #{response.code}: 
#{response.to_str}"

#!/usr/bin/env ruby
require 'rubygems'
require 'rest_client'

arg1, arg2 = ARGV.slice! 0, 2
abort "Syntax: $ ruby _loader.rb <ontology_name> <file_to_load>" unless arg2

filename = './' +  arg2
graph    = arg1
endpoint = 'http://localhost:8008/data/'

puts File.read(filename)
puts "Loading #{filename} into #{graph} in 4store"
response = RestClient.put endpoint + graph, File.read(filename), :content_type => 'application/rdf+xml'
puts "Response #{response.code}: 
#{response.to_str}"

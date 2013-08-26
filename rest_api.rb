#!/usr/bin/env ruby
 
 
require 'sinatra'
require 'rubygems'
require 'nokogiri'
require 'rest_client'

require 'json'
require 'dm-core'
require 'dm-migrations/adapters/dm-sqlite-adapter'
 

 

DataMapper::setup(:default, ENV['DATABASE_URL'] || 
  "sqlite3://#{File.join(File.dirname(__FILE__), 'tmp', 'triples.db')}")
 
# define the Data Model
 
class Triples 
  include DataMapper::Resource
  
  property :id,          Serial
  property :description, Text, :required => true
  property :is_done,     Boolean
 
  # helper method returns the URL for a triple based on id  
 
  def url
    "/api/triples/#{self.id}"
  end
 
  # change this to your desired Data Model 
  def to_json(*a)
    { 
      'guid'        => self.url, 
      'description' => self.description,
      'isDone'      => self.is_done 
    }.to_json(*a)
  end
 
  # (required) keys that MUST be found in the json
  REQUIRED = [:description, :is_done]
  
  # ensure json is safe.
  def self.parse_json(body)
    json = JSON.parse(body)
    ret = { :description => json['description'], :is_done => json['isDone'] }
    return nil if REQUIRED.find { |r| ret[r].nil? }
 
    ret 
  end
  
end

SPARQLendpoint = 'http://localhost:8008/sparql/'
 
# instructs DataMapper to setup your database
DataMapper.auto_upgrade!
 
# for testing
# get "/" do
#   response['Location'] = '/public'
#   response.status = 301
# end
 
 

get '/' do
  File.read(File.join('public', 'index.html'))
end

# SPARQL Query api
post "/api/sparqlQuery" do
  content_type 'text/plain'
  query = params[:q]
  # query = 'SELECT  ?type WHERE { ?thing a ?type . } ORDER BY ?type'

  # puts "POSTing SPARQL query to #{SPARQLendpoint}"
  response = RestClient.post SPARQLendpoint, :query => query
  
  # puts "Response #{response.code}"
  xml = Nokogiri::XML(response.to_str)

  concatenated_items = "";
  xml.xpath('//sparql:binding/sparql:uri', 'sparql' => 'http://www.w3.org/2005/sparql-results#').each do |item|    
    concatenated_items = concatenated_items + "<br>" + item.content
  end
  concatenated_items.to_s + "<br>"
  
end
 

# Index // List
get "/api/triples" do
  content_type 'application/json'
  { 'content' => Array(Triples.all) }.to_json
end
 
# Create
post "/api/triples" do
  opts = Triples.parse_json(request.body.read) rescue nil
  halt(401, 'Invalid Format') if opts.nil?

  triple = Triples.new(opts)
  halt(500, 'Could not save triple') unless triple.save
 
  response['Location'] = triple.url
  response.status = 201
end
 
# Read (:id)
get "/api/triples/:id" do
  triple = Triples.get(params[:id]) rescue nil
  halt(404, 'Not Found') if triple.nil?
 
  content_type 'application/json'
  { 'content' => triple }.to_json
end
 
# Update (:id)
put "/api/triples/:id" do
  triple = Triples.get(params[:id]) rescue nil
  halt(404, 'Not Found') if triple.nil?
  
  opts = Triples.parse_json(request.body.read) rescue nil
  halt(401, 'Invalid Format') if opts.nil?
  
  triple.description = opts[:description]
  triple.is_done = opts[:is_done]
  triple.save
  
  response['Content-Type'] = 'application/json'
  { 'content' => triple }.to_json
end
 
# Delete (:id)
delete "/api/triples/:id" do
  triple = Triples.get(params[:id]) rescue nil
  triple.destroy unless triple.nil?
end
 

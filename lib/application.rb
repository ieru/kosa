# encoding: UTF-8

require 'rubygems'

require 'sinatra'
require 'sinatra/sparql'
require 'sinatra/respond_to'

require 'rdf'
require 'rdf/turtle' 
require 'rdf/4store'
require 'rdfs'
#require 'rdf-agraph'
#require 'rdf/do'
#require 'data_objects'
#require 'do_sqlite3'
#require 'do_postgres'
require 'sparql'
require 'sparql/client'

require 'uri'
require 'json'
require 'yajl'
require 'equivalent-xml'
#require 'siren'
#require 'net/http'
#require 'rest_client'

class Kosa < Sinatra::Base

  attr_accessor :repo, :prefix, :root, :soft_limit, :sparql
 
  def initialize 
  
    @soft_limit = 10
    @prefix = RDF::URI.new('http://aims.fao.org/aos/agrovoc')
    @repo = RDF::FourStore::Repository.new('http://localhost:8008/')
    @sparql = SPARQL::Client.new(repo)
    @root = ''
    
    # @repo = RDF::DataObjects::Repository.new('sqlite3:kosa.db')
    # repo = RDF::DataObjects::Repository.new 'postgres://postgres@server/database'
    # repo = RDF::DataObjects::Repository.new(ENV['DATABASE_URL']) #(Heroku)
    # url = "http://user:passwd@localhost:10035/repositories/example"
    # repo = RDF::AllegroGraph::Repository.new(url, :create => true)
  end


    # RDF::Repository API:
 
    # repository.readable?
    # repository.writable?
    # repository.empty?
    # repository.count  
    # repository.has_statement?(statement)
    # repository.each_statement { |statement| statement.inspect! }
    # repository.insert(*statements)
    # repository.insert(statement)
    # repository.insert([subject, predicate, object])
    # repository << statement
    # repository << [subject, predicate, object]
    # repository.delete(*statements)
    # repository.delete(statement)
    # repository.delete([subject, predicate, object])
    # repository.clear!
 
    # Get Root (SPARQL 1.1)
    
    # SELECT ?cls1
    #  WHERE{
    #    ?cls1 a owl:Class .
    #    FILTER NOT EXISTS { ?cls1 rdfs:subClassOf ?cls2 .}
    # }

    # Get ROOT (SPARQL)
    
    # SELECT ?cls1
    #  WHERE{
    #     ?cls1 a owl:Class .
    #     OPTIONAL{ ?cls1 rdfs:subClassOf ?cls2 .}
    #     FILTER(!BOUND(?cls2))
    # }

    # Helper module to avoid confussion between JSON and RDF::JSON gems
    module JSON2
      include ::JSON
      module_function :parse
    end


    #########################################################################################################
    #########################################################################################################
    
    # api:

    # test endpoint1 
    get '/test' do
        "test"
    end
    
    # test endpoint2
    get '/api/test' do
        {:id=>'4', :name=>'test', :children=>[], :related=>[], :childrenNumber=>1, :relatedNumber=>1}.to_json
    end
    
    # api index     
    get '/api' do
        {}.to_json
    end
    
    # first node in a tree
    get '/api/gettopconcepts' do
      lang = params[:lang]
      get_top_concepts(lang)
    end

    # Parent nodes
    get '/api/getbroaderconcepts' do
      lang = params[:lang]
      node = params[:node]
      get_broader_concepts(node, lang)
    end
    
    # node children. Returns {} if no children
    get '/api/getnarrowerconcepts' do
      lang = params[:lang]
      node = params[:node]
      get_narrower_concepts(node, lang)
    end

  
   # private methods
   
   # private
  

    def get_top_concepts(lang=nil)

        if lang.nil? || !lang.length == 2
          lang = 'EN'
        end        
        
        query_children = sparql.query("
         PREFIX owl:  <http://www.w3.org/2002/07/owl#>
         PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
         PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
         SELECT DISTINCT ?x ?label
         WHERE {
           ?x a owl:Class .
           ?x rdfs:label ?label .
           OPTIONAL {
             ?x rdfs:subClassOf ?super
           }
           FILTER (!bound(?super)) .
         }
        ")
        
         #  FILTER (langMatches(lang(?label), '#{lang}')) .           
        
	
        root = query_children.each_solution do |w| 
            {:w => w.label}.to_json
        end
        
        # {:name=>root, :id=>remove_prefix(root), :children=>[], :related=>[], :children_number=>0, :related_number=>0}.to_json

     
    end

  

    def get_narrower_concepts(node=nil, lang=nil)

      if node.nil?
        {}.to_json
      else
        
        if lang.nil? || !lang.length == 2
          lang = 'EN'
        end
    
        
        node = remove_prefix(node)
        
        uri = prefix + '/' + node
        
        if !uri.valid?
          {:name=>'', :id=>'', :children=>[], :related=>[], :children_number=>0, :related_number=>0}.to_json
        end
        
        
        query_children = sparql.query("
         PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
         PREFIX agrovoc: <#{prefix}/>
         PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
         SELECT DISTINCT ?x ?label 
         WHERE
         {
            ?x skos:narrower <#{uri}>  .
            ?x skos:prefLabel  ?label .
            FILTER(langMatches(lang(?label), '#{lang}')) . 
         }
         LIMIT 10
        ")
        
        
	
        children_list = query_children.map { | w | { 
          :name=> w.label, :id=>remove_prefix(w.x), :children=>[], :related=>[], :children_number=>0, :related_number=>0 
        } }
        
        {:name=>uri, :id=>node, :children=>children_list, :related=>children_list, :children_number=>0, :related_number=>0}.to_json

      end
    end




    def get_broader_concepts(node=nil, lang=nil)
    
      if node.nil?
        {}.to_json
      else
        
        if lang.nil? || !lang.length == 2
          lang = 'EN'
        end
    
        
        # Consult Adapter's Specific Respository syntax (http://rdf.rubyforge.org/RDF/Repository.html)
        # to create queries. eg: DataObjects (SQLite or Postgres)->  http://rdf.rubyforge.org/do/RDF/DataObjects/Repository.html
        # , AllegroGraph->http://rdf-agraph.rubyforge.org/ ... etc        
        # AllegroGraph query syntax:
        #
        # list = repo.build_query do |q|
        #    q.pattern [:subject, RDFS.subClassOf,  node.to_s]
        # end.map do |u|
        #   {:child => u.subject}
        # end
        
        # should work (?)      
        # list = repo.query([:subject, RDF::RDFS.subClassOf,  node]).map do |u|
        # list = repo.query([:s, RDF::SKOS.broader , :o]).map { |w| {'a'=>w[0], 'b'=> w[1], 'c'=> w[2] }  }
        
        node = remove_prefix(node)
        
        uri = prefix + '/' + node
        
        # has_narrowers at AGROVOC:
        # .../c_12848 --> c_1473

        if !uri.valid?
          {:name=>'', :id=>'', :children=>[], :related=>[], :children_number=>0, :related_number=>0}.to_json
        end
        
        # query_children = sparql.query("CONSTRUCT WHERE { <"+ uri +"> skos:narrower ?o } LIMIT 10")
	# c_1329377502888
=begin
	query_children = sparql.query("
	PREFIX skos: <http://www.w3.org/2004/02/skos/core#> 
	  CONSTRUCT {
	    ?o ?label
	  }
	  WHERE { 
	    <"+ uri +"> skos:broader ?o . 
	    <"+ uri +"> skos:altLabel ?label . 
	    } 
	  LIMIT 10
        ")

query_children = sparql.query("
PREFIX skos: <http://www.w3.org/2004/02/skos/core#> 
SELECT ?s ?label ?o 
WHERE
{
<#{uri}> skos:broader ?o .
?o skos:altLabel ?label . FILTER(langMatches(lang(?label), '#{lang}')) . 
FILTER isLiteral(?label) .
}
LIMIT 10
")

?x rdfs:subClassOf agrovoc:#{node} .

=end

query_children = sparql.query("
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX agrovoc: <#{prefix}/>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
SELECT DISTINCT ?x ?label 
WHERE
{
    ?x skos:broader <#{uri}>  .
    ?x skos:prefLabel  ?label .
    FILTER(langMatches(lang(?label), '#{lang}')) . 
}
LIMIT 10
")
        
	
        # query_children = sparql.construct.where([:s, RDF::SKOS.broader, :o])
	        
        # query_children = RDF::Query.new({
        #  :s => {
        #       RDF::SKOS.broader  => :o,
        #       RDF::SKOS.prefLabel => :label,
        #   }
        # })
        #         
        # query_children = RDF::Query.new do
        #   pattern [:s, RDF::SKOS.narrower, :o]
        #   pattern [:s, RDF::SKOS.prefLabel, :label]
        # end
        

        #query_related = RDF::Query.new do
        #  pattern [:s, RDF::SKOS.narrower, :o]
        #end
        
        #pattern [:s, RDF::RDFS.label, :label, {:optional => true}]        
        #pattern [:s, RDF::RDFS.subClassOf, :o]
        #pattern [:s, RDF::RDFS.label, :label]
        #pattern [:s, RDF::SKOS.narrower, :o]
        
        # list = repo.query([:s, RDF::RDFS.label, :slabel][:o, RDF::RDFS.label, :olabel][:s, RDF::SKOS.broader, :o]).map { |w| {'a'=>w[0], 'b'=> w[1], 'c'=> w[2] }  }
        # list = query.execute(repo).map { |w| {'a'=>w[0], 'b'=> w[1], 'c'=> w[2] }  }
        # list = query.execute(repo).map { |w| {'id'=>remove_prefix(w.s), 'child'=> w.o }  }
        
        # children = query_children
        # children_count = children.execute(repo, {:o => uri}).filter{ |w|  w.name.language == lang }.count
        children_list = query_children.map { | w | { 
          :name=> w.label, :id=>remove_prefix(w.x), :children=>[], :related=>[], :children_number=>0, :related_number=>0 
        } }
        
        # todo: language filter -> solutions.filter { |solution| solution.name.language == :es }
        #list.first.s.to_uri.root.to_s + list.first.s.to_s
                
        # list.to_json
        
        {:name=>uri, :id=>node, :children=>children_list, :related=>children_list, :children_number=>0, :related_number=>0}.to_json
        # "#{prefix}/#{node}"

        
        # Cropontology Proxy   
        # json_string = getJsonFromExternalAPI("http://www.cropontology.org/get-children/", node)
        # parser = Yajl::Parser.new
        # json = parser.parse(json_string)
        # json.to_json
        # # Siren.query("$..[? (@.name != null) & (@.children != null) & (@.children[0] != null) & (@.name = '"+node.to_s+"')][=children][0][? @.name != null][= name]", json).to_json
      end

    end

    
    # dummy method with test JSON data <--- this should be retrieved from database
    def test_json
      json_file = File.dirname(__FILE__) + "/../public/json/test_json.json"
      if File.exists?(json_file)
        json = File.read(json_file)
        # json
        return json
      else 
        return {}.to_json
      end
    end

    # access external apis
    def get_json_from_external_url(url, node)
      url = url + node
      resp = Net::HTTP.get_response(URI.parse(url))
      return resp.body
    end
    
    # @todo: check this 
    # removes PREFIX from URIs 
    def remove_prefix(node)
      return node.to_s.split('/').last
    end
    
    # @todo: check this
    # get PREFIX by removing the literal
    def get_prefix(uri)
      return uri.gsub(uri.to_s.split('/').last, "")
    end

end

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
require 'yajl/json_gem'
require 'equivalent-xml'

#require 'siren'
#require 'net/http'
#require 'rest_client'

class Kosa < Sinatra::Base

  attr_accessor :repo, :prefix, :root, :sparql
  attr_reader :results_per_page, :solf_limit
   
  def initialize 
    
    @soft_limit = 100
    @results_per_page = 10
    
    
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
    get '/api/getsimilarconcepts' do
      lang = params[:lang]
      node = params[:node]
      # get_similar_concepts(nodel, lang)
    end

    # Parent nodes
    get '/api/getbroaderconcepts' do
      lang = params[:lang]
      node = params[:node]
      page = params[:page]
      get_broader_concepts(node, lang, page)
    end
    
    # node children. Returns {} if no children
    get '/api/getnarrowerconcepts' do
      lang = params[:lang]
      node = params[:node]
      page = params[:page]
      get_narrower_concepts(node, lang, page)
    end

    # first node in a tree
    get '/api/gettopconcepts' do
      lang = params[:lang]
      get_top_concepts(lang)
    end

  
   # private methods
   # private
  

    def get_top_concepts(lang=nil)

        encoder = Yajl::Encoder.new
        
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
        ").limit(1)
         
        
         #  FILTER (langMatches(lang(?label), '#{lang}')) .           
        
	
        root = query_children.each_solution do |w| 
            encoder.encode({:name => w.label, :id => remove_prefix(w.x)})
        end
        
        # {:name=>root, :id=>remove_prefix(root), :children=>[], :related=>[], :children_number=>0, :related_number=>0}.to_json

     
    end

  

    def get_narrower_concepts(node=nil, lang=nil, page=0)

      
      encoder = Yajl::Encoder.new

      if node.nil?
        encoder.encode(to_json)
      else
        
        if lang.nil? || !lang.length == 2
          lang = 'EN'
        end
    
        if page.nil? || page.to_i < 0
          page = 0
        end
        
        offset = page * results_per_page
        
        node = remove_prefix(node)
        
        uri = prefix + '/' + node
        
        if !uri.valid?
        encoder.encode({})
          # {:name=>'', :id=>'', :children=>[], :related=>[], :children_number=>0, :related_number=>0}.to_json
        end
        
        
        query_children = sparql.query("
         PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
         PREFIX agrovoc: <#{prefix}/>
         PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
         SELECT DISTINCT ?x ?label 
         WHERE
         {
            <#{uri}> skos:narrower ?x  .
            ?x skos:prefLabel  ?label .
            FILTER(langMatches(lang(?label), '#{lang}')) . 
         }
         
        ").offset(offset).limit(results_per_page)
        
        
         children_list = query_children.map { |w|  
          { :name=> w.label, :id=>remove_prefix(w.x), :children=>[], :related=>[], :children_number=>0, :related_number=>0 }
         } 
        
         encoder.encode({ :name=>uri, :id=>node, :children=>children_list, :related=>children_list, :children_number=>0, :related_number=>0 })
	
      end
    end




    def get_broader_concepts(node=nil, lang=nil, page=0)
    
      encoder = Yajl::Encoder.new

      if node.nil?
        encoder.encode({})
      else
        
        if lang.nil? || !lang.length == 2
          lang = 'EN'
        end
        
        if page.nil? || page.to_i < 0
          page = 0
        end
        
        offset = page * results_per_page
        
        node = remove_prefix(node)
        
        uri = prefix + '/' + node
        
        if !uri.valid?
          {}.to_json
          # {:name=>'', :id=>'', :children=>[], :related=>[], :children_number=>0, :related_number=>0}.to_json
        end
        
        query_children = sparql.query("
          PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
          PREFIX agrovoc: <#{prefix}/>
          PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
          SELECT DISTINCT ?x ?label 
          WHERE
          {
            <#{uri}> skos:broader ?x  .
            ?x skos:prefLabel  ?label .
            FILTER(langMatches(lang(?label), '#{lang}')) . 
          }
         ").offset(offset).limit(results_per_page)
        
         children_list = query_children.map { |w|  
          { :name=> w.label, :id=>remove_prefix(w.x), :children=>[], :related=>[], :children_number=>0, :related_number=>0 }
         } 
        
         encoder.encode({ :name=>uri, :id=>node, :children=>children_list, :related=>children_list, :children_number=>0, :related_number=>0 })

      end
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

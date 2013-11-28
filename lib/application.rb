# encoding: UTF-8

# require 'rubygems'

require 'sinatra'

# todo remove
#require 'sinatra/sparql'
#require 'sinatra/respond_to'

# rdf and rdf syntaxes
require 'rdf'
require 'rdf/turtle' 

# database adapters
#require 'rdf/4store'
require 'rdf/sesame'
#require 'rdf-agraph'
#require 'rdf/do'
#require 'data_objects'
#require 'do_sqlite3'
#require 'do_postgres'

# rdf related gems
require 'sparql'
require 'sparql/client'
require 'uri'

# xml, json parsing
require 'yajl/json_gem'
require 'equivalent-xml'

# network access
#require 'net/http'
#require 'rest_client'

# Config.
Repository = 'KOS'

# main class
class Kosa < Sinatra::Base
  
  attr_accessor :repo, :prefix, :root, :sparql
  attr_reader :results_per_page, :soft_limit, :encoder
   
  def initialize 
    
    @soft_limit = 1000
    @results_per_page = 5
    
    
    @prefix = RDF::URI.new('http://aims.fao.org/aos/agrovoc')
    
    url = "http://127.0.0.1:8888/openrdf-sesame/repositories/#{Repository}"
    @repo = RDF::Sesame::Repository.new(url)
    # @repo = RDF::FourStore::Repository.new('http://localhost:8008/')
    
    @sparql = SPARQL::Client.new(repo)
    @root = ''
    @encoder = Yajl::Encoder.new

    
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
    # module JSON2
    #   include ::JSON
    #   module_function :parse
    # end


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
      cache_control :public, max_age: 1800  # 30 mins.
      lang = params[:lang]
      term = params[:term]
      get_similar_concepts(term, lang)
    end

    # Parent nodes
    get '/api/getbroaderconcepts' do
      cache_control :public, max_age: 1800  # 30 mins.
      lang = params[:lang]
      node = params[:node]
      page = params[:page]
      get_broader_concepts(node, lang, page)
    end
    
    # node children. Returns {} if no children
    get '/api/getnarrowerconcepts' do
      cache_control :public, max_age: 1800  # 30 mins.
      lang = params[:lang]
      node = params[:node]
      page = params[:page]
      get_narrower_concepts(node, lang, page)
    end

    # first node in a tree
    get '/api/gettopconcepts' do
      cache_control :public, max_age: 1800  # 30 mins.
      lang = params[:lang]
      get_top_concepts(lang)
    end

  
   # private methods
   # private
  

    def get_top_concepts(lang=nil)
        cache_control :public, max_age: 1800  # 30 mins.

        
        
        if lang.nil? || !lang.length == 2
          lang = 'EN'
        else
          lang = lang.upcase
        end   
                
        # why doesnt this query work?     
=begin
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
=end 

        # changed query for 'the first node which has children'
        query = sparql.query("
         PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
         SELECT REDUCED ?x ?label
         WHERE
         {
         # ?x ?p ?o
         ?x skos:prefLabel ?label .
         FILTER(langMatches(lang(?label), '#{lang}')) .
         }
         LIMIT 1
        ")

=begin
        query = sparql.query("
        PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
        SELECT ?concept ?p ?lcc
        WHERE {  
            ?concept ?p ?lcc.
            OPTIONAL { ?concept skos:broader ?broader }
            FILTER (!bound(?broader))
        } LIMIT 1
        ")
=end

        
        #query = RDF::Query.new({
        #  :s => { RDF::SKOS.narrower => :o},
        #  :o => { RDF::SKOS.prefLabel => :label}
        #})

        #pattern [:s, RDF::RDFS.label, :label, {:optional => true}]
        #pattern [:s, RDF::RDFS.subClassOf, :o]
        #pattern [:s, RDF::SKOS.prefLabel, :label]
        #pattern [:s, RDF::RDFS.label, :label]
        #pattern [:s, RDF::SKOS.narrower, :o]

        # list = repo.query([:s, RDF::RDFS.label, :slabel][:o, RDF::RDFS.label, :olabel][:s, RDF::SKOS.broader, :o]).map { |w| {'a'=>w[0], 'b'=> w[1], 'c'=> w[2] }  }
        # list = query.execute(repo).map { |w| {'a'=>w[0], 'b'=> w[1], 'c'=> w[2] }  }
        # list = query.execute(repo).map { |w| {'id'=>remove_prefix(w.s), 'child'=> w.o }  }

	#optimized_query = query.optimize!
        #children_count = 0;
        #root = optimized_query.execute(repo).distinct.limit(1).map { |w| {
        #  :name=> w.label, :id=>remove_prefix(w.s), :children=>[], :related=>[], :children_number=>0, :related_number=>0
        #} }
        root = query.map { |w|
          {:a => w }
        }
        encoder.encode(root)

    end

  

    def get_narrower_concepts(node=nil, lang=nil, page=0)

      
      # encoder = Yajl::Encoder.new
      
      if node.nil?
        encoder.encode(to_json)
      else
        
        if lang.nil? || !lang.length == 2
          lang = 'EN'
        else
          lang = lang.upcase
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
        
        
        query = sparql.query("
         PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
         PREFIX agrovoc: <#{prefix}/>
         PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
         SELECT REDUCED ?x ?label
         WHERE
         {
            <#{uri}> skos:narrower ?x  .
            ?x skos:prefLabel  ?label .
            FILTER(langMatches(lang(?label), '#{lang}')) . 
         }         
        ")
        children_count = query.count()
        
        children_query = query.offset(offset).limit(results_per_page)
        
        
        children_list = children_query.map { |w|  
          { :name=> w.label, :id=>remove_prefix(w.x), :children=>[], :related=>[], :children_number=>0, :related_number=>0 }
        } 
        
         encoder.encode({ :name=>uri, :id=>node, :children=>children_list, :related=>children_list, :children_number=>children_count, :related_number=>0 })
	
      end
    end


    def get_similar_concepts(term=nil, lang=nil)
    
      # encoder = Yajl::Encoder.new

      if term.nil?
        encoder.encode({})
      else
        
        if lang.nil? || !lang.length == 2
          lang = 'EN'
        else
          lang = lang.upcase
        end
        
        
        
        query = sparql.query("
          PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
          PREFIX agrovoc: <#{prefix}/>
          PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
          SELECT REDUCED ?label 
          WHERE
          {
            ?x skos:prefLabel ?label .
            FILTER(langMatches(lang(?label), '#{lang}')).
            FILTER(contains(?label, '#{term}'))
          }
          LIMIT 5
         ")
         
         list = query.map { |w|  
          w.label
         } 
        
         encoder.encode(list)

      end
    end



    def get_broader_concepts(node=nil, lang=nil, page=0)
    
      # encoder = Yajl::Encoder.new

      if node.nil?
        encoder.encode({})
      else
        
        if lang.nil? || !lang.length == 2
          lang = 'EN'
        else
          lang = lang.upcase
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
        
        query = sparql.query("
          PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
          PREFIX agrovoc: <#{prefix}/>
          PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
          SELECT REDUCED ?x ?label 
          WHERE
          {
            <#{uri}> skos:broader ?x  .
            ?x skos:prefLabel  ?label .
            FILTER(langMatches(lang(?label), '#{lang}')) . 
          }
         ")
         parents_count = query.count()
        
         parents_query = query.offset(offset).limit(results_per_page)
         
         parents_list = parents_query.map { |w|  
          { :name=> w.label, :id=>remove_prefix(w.x), :children=>[], :related=>[], :children_number=>0, :related_number=>0 }
         } 
        
         encoder.encode({ :name=>uri, :id=>node, :children=>parents_list, :related=>parents_list, :children_number=>parents_count, :related_number=>0 })

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

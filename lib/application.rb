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
    
    # maximun number of result on query ~= 10pages
    @soft_limit = 50
    # elements on a tree level
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
      concept = 'broader'
      get_concepts(concept, node, lang, page)
    end
    
    # node children. Returns {} if no children
    get '/api/getnarrowerconcepts' do
      cache_control :public, max_age: 1800  # 30 mins.
      lang = params[:lang]
      node = params[:node]
      page = params[:page]
      concept = 'narrower'
      get_concepts(concept, node, lang, page)
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
           { :text => w.label, :id => remove_prefix(w.label) }
         } 
        
         encoder.encode(list)

      end
    end


    # passed type arg to Dry the method
    def get_concepts(type=nil,node=nil, lang=nil, page=nil)
    
      # encoder = Yajl::Encoder.new

        if node.nil?
          # return null to save resources
          return encoder.encode({})
        end 
        
        if type.nil?
          # return null to save resources
          type = 'narrower'
        end 
        
        
        if lang.nil? || !lang.length == 2
          lang = 'EN'
        else
          lang = lang.upcase
        end
        
        if page.nil? 
          page = 1
        else
          page = page.to_i
          if page.to_i < 1
            # stop execution to save resources
            return {}.to_json
          end
        end
        
        offset = (page - 1) * results_per_page
        
        node = remove_prefix(node)
        
        uri = prefix + '/' + node
        
        if !uri.valid?
          # return empty, and stop to save resources
          return {}.to_json
        end
        
        query = sparql.query("
          PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
          PREFIX agrovoc: <#{prefix}/>
          PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
          SELECT REDUCED ?x ?label ?ylabel 
          WHERE
          {
            <#{uri}> skos:#{type} ?x .
            <#{uri}> skos:prefLabel ?ylabel .
            ?x skos:prefLabel ?label .
            FILTER(langMatches(lang(?label), '#{lang}')) . 
            FILTER(langMatches(lang(?ylabel), '#{lang}')) . 
          }
          LIMIT #{soft_limit}
         ")
         count = query.count()        
         parents_query = query.offset(offset).limit(results_per_page)
        
         pages = count.divmod results_per_page
         
         modulus = pages[1].floor
         pages = pages[0].floor
         
         if !modulus.eql? 0
           pages += 1
         end
         

        if page > pages
          # return empty, and stop to save resources
          return {}.to_json
        end

         ylabel = nil
         
         parents_list = parents_query.map { |w|  
         
           if ylabel.nil?
             ylabel = w.ylabel
           end
           { :name=> w.label, :id=>remove_prefix(w.x), :children=>[], :related=>[], :children_number=>0, :related_number=>0 }
         } 
        
         return encoder.encode({ :name=>ylabel, :id=>node, :children=>parents_list, :related=>parents_list, :children_pages=>pages, :page=>page, :related_number=>0 })
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

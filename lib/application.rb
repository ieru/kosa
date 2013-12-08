# encoding: UTF-8

require 'sinatra'
require 'uri'
require 'sanitize'

# rdf and rdf syntaxes
require 'rdf'
require 'rdf/turtle' 
require 'rdf/rdfxml' 

# Database adapters
require 'rdf/sesame'
#require 'rdf/4store'
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
# Repository = 'KOS' # <-- Agrovoc
# Repository = 'cropontology'
Repository = 'oedunet'


# main class
class Kosa < Sinatra::Base
  
  attr_accessor :repo, :prefix, :root, :sparql
  attr_reader :results_per_page, :soft_limit, :encoder
   
  def initialize 
    
    # maximun number of result on query ~= 10pages
    @soft_limit = 30
    
    # elements on a tree level
    @results_per_page = 4
    
    
    # @prefix = RDF::URI.new('http://aims.fao.org/aos/agrovoc')
    @prefix = RDF::URI.new('http://www.cropontology.org/rdf')
    
    url = "http://127.0.0.1:8888/openrdf-sesame/repositories/#{Repository}"
    @repo = RDF::Sesame::Repository.new(url)
    
    @sparql = SPARQL::Client.new(repo)
    @root = ''
    @encoder = Yajl::Encoder.new

    # repository string for other adpters    
    
    # @repo = RDF::FourStore::Repository.new('http://localhost:8008/')
    # @repo = RDF::DataObjects::Repository.new('sqlite3:kosa.db')
    # repo = RDF::DataObjects::Repository.new 'postgres://postgres@server/database'
    # repo = RDF::DataObjects::Repository.new(ENV['DATABASE_URL']) #(Heroku)
    # url = "http://user:passwd@localhost:10035/repositories/example"
    # repo = RDF::AllegroGraph::Repository.new(url, :create => true)
  end

    # test endpoint1 
    get '/test' do
        "test"
    end
    
    # test endpoint2
    get '/api/test' do
        encoder.encode({:id=>'4', :name=>'test', :children=>[], :related=>[], :childrenNumber=>1, :relatedNumber=>1})
    end
    
    # api index     
    get '/api' do
        encoder.encode({})
    end
    
    # first node in a tree
    get '/api/getsimilarconcepts' do
      cache_control :public, max_age: 1800  # 30 mins.
      
      lang = Sanitize.clean(params[:lang])
      term = Sanitize.clean(params[:term])
      get_similar_concepts(term, lang)
    end

    # Parent nodes
    get '/api/getbroaderconcepts' do
      cache_control :public, max_age: 1800  # 30 mins.
      
      lang = Sanitize.clean(params[:lang])
      uri = Sanitize.clean(params[:uri])
      page = Sanitize.clean(params[:pag])
      # Not used on Cropontology 
      concept = 'rdfs:Class'
      get_concepts(concept, uri, lang, page)
    end
    
    # node children. Returns {} if no children
    get '/api/getnarrowerconcepts' do
      cache_control :public, max_age: 1800  # 30 mins.
      
      lang = Sanitize.clean(params[:lang])
      uri = Sanitize.clean(params[:uri])
      page = Sanitize.clean(params[:pag])
      concept = 'rdfs:subClassOf'
      get_concepts(concept, uri, lang, page)
    end

    # first node in a tree
    get '/api/gettopconcepts' do
      cache_control :public, max_age: 1800  # 30 mins.
      
      lang = Sanitize.clean(params[:lang])
      get_top_concepts(lang)
    end

  
   # private methods
   # private
  

    def get_top_concepts(lang=nil)
      
        if lang.nil? || !lang.length == 2
          lang = 'EN'
        else
          lang = lang.upcase
        end
      
        query = sparql.query("
          prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>
          prefix owl: <http://www.w3.org/2002/07/owl#>
          prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
          SELECT ?cl ?label
          WHERE {
            ?cl rdfs:subClassOf ?a .
            ?cl rdfs:label ?label
          }
          offset 19 
          limit 1
        ")
      
        list = query.map { |w|  
           { :text => w.label, :uri => w.cl }
        } 
         
        return encoder.encode(list)

    end

    def get_similar_concepts(term=nil, lang=nil)
    
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
          PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
          SELECT REDUCED ?x ?label 
          WHERE
          {
            # ?x skos:prefLabel ?label .
            ?x rdfs:label ?label
            # FILTER(langMatches(lang(?label), '#{lang}')).
            FILTER(contains(?label, '#{term}'))
          }
          LIMIT #{soft_limit}
         ")
         
         list = query.map { |w|  
           { :text => w.label, :uri => w.x }
         } 
        
         encoder.encode(list)

      end
    end


    # passed type arg to Dry the method
    def get_concepts(type=nil,uri=nil, lang=nil, page=nil)
    

        if uri.nil?
          # return null to save resources
          return encoder.encode({:error=>'No uri selected'})
        end 
        
        if type.nil?
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
          if page < 1
            # stop execution to save resources
            return encoder.encode({:error=>'Page not valid'})
          end
        end
        
        offset = (page - 1) * results_per_page
        
        id = remove_prefix(uri)
        
        # uri = prefix + '/' + node
        
        rdf_uri = RDF::URI.new(uri)
        
        if !rdf_uri.valid?
          # return empty, and stop to save resources
          return encoder.encode({:error=>'Error validating Uri "#{uri}"'})
        end

        # url_uri = prefix + '/' + CGI::escape(node.to_s)
=begin
        query = sparql.query("
          PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
          PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
          SELECT ?x ?label
          # (MIN(?xlabel) AS ?label) 
          WHERE
          {
            ?x #{type} <#{uri}>.
            #<#{uri}> rdfs:label ?xlabel
            #FILTER(?xlabel != "").
            { select ?label where { <http://MoKi_light#Method> rdfs:label ?label. FILTER(?label != "") } LIMIT 1 }
            # FILTER(langMatches(lang(?label), '#{lang}')) .
            # FILTER(langMatches(lang(?ylabel), '#{lang}')) . 
          } 
          #GROUP BY ?x
          LIMIT #{soft_limit}
         ")
=end     

        query = sparql.query("
          PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
          PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
          SELECT ?x ?n (MIN(?xlabel) AS ?label)
          WHERE
          {
            ?x #{type} <#{uri}> .
            ?x rdfs:label ?xlabel .
            BIND( STRLEN(?x) AS ?n) .
          } GROUP BY ?x ?n 
          HAVING (STRLEN(str(?x)) > 0)
          LIMIT #{soft_limit}
         ")

         count = query.count()        
         parents_query = query.offset(offset).limit(results_per_page)

         # return encoder.encode({ :a=>count })
        
         pages = count.divmod results_per_page
         
         modulus = pages[1].floor
         pages = pages[0].floor
         
         if !modulus.eql? 0
           pages += 1
         end
         

        if page > pages
          # return empty, and stop to save resources
          return encoder.encode({:info=>'No data'})
        end

         ylabel = nil
         
         parents_list = parents_query.map { |w|  

         
           if ylabel.nil?
             # ylabel = w.ylabel
             ylabel = ''
           end

           { :name=> w.x, :id=>'', :uri=>w.x, :pages=>0, :related_count=>0, :children=>[], :related=>[] }
         } 
        
         return encoder.encode({ :name=>ylabel, :id=>'', :uri=>uri.to_s, :pages=>pages, :page=>page, :related_count=>0, :children=>parents_list, :related=>parents_list })
    end

    # @todo: check this 
    # removes PREFIX from URIs 
    def remove_prefix(uri)
      
      newUri = uri.to_s.split('/').last.gsub(/[^\w\d]+/,'');
      return newUri
    end
    
    # @todo: check this
    # get PREFIX by removing the literal
    def get_prefix(uri)
      return uri.gsub(uri.to_s.split('/').last, "")
    end

end

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
      node = params[:node]
      get_top_concepts(node, lang)
    end

    # data from one node
    get '/api/getconcept' do
      lang = params[:lang]
      node = params[:node]
      get_concept(node, lang)
    end
    
    # all nodes JSON object
    get '/api/getconcepts' do
      lang = params[:lang]
      get_concepts(lang)
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

    get '/api/getrelatedconcepts' do
      lang = params[:lang]
      node = params[:node]
      get_related_concepts(node, lang)
    end
    
  
   # private methods
   
   # private
  
  
    def get_top_concepts(node=nil, lang="en")
      if node.nil?
        {}.to_json
      else
        {}.to_json
        
        # legacy: cropontology proxt
        # json_string = getJsonFromExternalAPI("http://www.cropontology.org/get-term-parents/", "CO_010:0000000")
        # parser = Yajl::Parser.new
        # json = parser.parse(json_string)
        # Siren.query("$[0][0]", json).to_json        
      end
    end


    def get_concept(node=nil, lang="en")
      if node.nil? 
        {}.to_json
      else
        {}.to_json
        
        # legacy: cropontology proxy
        # json_string = getJson
        # parser = Yajl::Parser.new
        # json = parser.parse("["+json_string+"]")
        # Siren.query("$..[? (@.name != null) & (@.children != null) & (@.children[0] != null) & (@.name = '"+node.to_s+"')][= @]", json).to_json
     end
    end

    def get_concepts(lang="en")
      # a = {"aa": "bb"}.to_json
      return test_json
    end


    def get_narrower_concepts(node=nil, lang="en")
      if node.nil?
        {}.to_json
      else
        
        
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
        
        
        
                
        query_children = RDF::Query.new do
           pattern [:s, RDF::SKOS.narrower, :o]
        end
        
        # pattern [:s, RDF::SKOS.narrower, :o]

        #query_related = RDF::Query.new do
        #  Pattern.new(:s, RDF:SKOS.narrower, :o).variable_terms
        #end
        
        #pattern [:s, RDF::RDFS.label, :label, {:optional => true}]        
        #pattern [:s, RDF::RDFS.subClassOf, :o]
        #pattern [:s, RDF::SKOS.prefLabel, :label]
        #pattern [:s, RDF::RDFS.label, :label]
        #pattern [:s, RDF::SKOS.narrower, :o]
        
        # list = repo.query([:s, RDF::RDFS.label, :slabel][:o, RDF::RDFS.label, :olabel][:s, RDF::SKOS.broader, :o]).map { |w| {'a'=>w[0], 'b'=> w[1], 'c'=> w[2] }  }
        # list = query.execute(repo).map { |w| {'a'=>w[0], 'b'=> w[1], 'c'=> w[2] }  }
        # list = query.execute(repo).map { |w| {'id'=>remove_prefix(w.s), 'child'=> w.o }  }
        
        children = query_children.optimize!
        # children_count = children.execute(repo, {:o => uri}).filter{ |w|  w.name.language == lang }.count
        children_count = 0;
        children_list = children.execute(repo, {:s => uri}).distinct.limit(soft_limit).map { |w| { 
          :name=> remove_prefix(w.o), :id=>Random.new.rand(10000), :children=>[], :related=>[], :children_number=>0, :related_number=>0 
        } }
        
        # todo: language filter -> solutions.filter { |solution| solution.name.language == :es }
=begin
        related = query_related.optimize!
        related_count = related.execute(repo, {:o => uri}).count
        related_list = related.execute(repo, {:o => uri}).limit(soft_limit).map { |w| { 
          :name=> w.label, :id=>remove_prefix(w.o), :children=>[], :related=>[], :children_number=>0, :related_number=>0
        } }
=end    

        #list.first.s.to_uri.root.to_s + list.first.s.to_s
                
        # list.to_json
        
        {:name=>node, :id=>node, :children=>children_list, :related=>children_list, :children_number=>0, :related_number=>children_count}.to_json
        # "#{prefix}/#{node}"

        
        # Cropontology Proxy   
        # json_string = getJsonFromExternalAPI("http://www.cropontology.org/get-children/", node)
        # parser = Yajl::Parser.new
        # json = parser.parse(json_string)
        # json.to_json
        # # Siren.query("$..[? (@.name != null) & (@.children != null) & (@.children[0] != null) & (@.name = '"+node.to_s+"')][=children][0][? @.name != null][= name]", json).to_json
      end
    end


    def get_broader_concepts(node=nil, lang="en")
      if node.nil?
        {}.to_json
      else
        
        
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
        
        query_children = sparql.query("CONSTRUCT WHERE { ?s skos:narrower ?o }")

        # query_children = sparql.construct().where([:s, RDF::SKOS.broader, :o])
	        
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
        
        children = query_children.optimize!
        # children_count = children.execute(repo, {:o => uri}).filter{ |w|  w.name.language == lang }.count
        children_list = children.execute(repo).limit(soft_limit).map { |w| { 
          :name=> w.o, :id=>remove_prefix(w.o), :children=>[], :related=>[], :children_number=>0, :related_number=>0 
        } }
        
        # todo: language filter -> solutions.filter { |solution| solution.name.language == :es }
=begin
        related = query_related.optimize!
        related_count = related.execute(repo).count
        related_list = related.execute(repo, {:o => uri}).limit(soft_limit).map { |w| { 
          :name=> w.label, :id=>remove_prefix(w.s), :children=>[], :related=>[], :children_number=>0, :related_number=>0
        } }
=end    
        #list.first.s.to_uri.root.to_s + list.first.s.to_s
                
        # list.to_json
        
        {:name=>node, :id=>node, :children=>children_list, :related=>children_list, :children_number=>0, :related_number=>0}.to_json
        # "#{prefix}/#{node}"

        
        # Cropontology Proxy   
        # json_string = getJsonFromExternalAPI("http://www.cropontology.org/get-children/", node)
        # parser = Yajl::Parser.new
        # json = parser.parse(json_string)
        # json.to_json
        # # Siren.query("$..[? (@.name != null) & (@.children != null) & (@.children[0] != null) & (@.name = '"+node.to_s+"')][=children][0][? @.name != null][= name]", json).to_json
      end
    end

    
    # Not implemented Yet
    def get_related_concepts(node=nil, lang="en")
      if node.nil?
        {}.to_json
      else
        {}.to_json
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







   
=begin



    #################################################################################################################
    #################################################################################################################
    
    # todo: remove


    #
    # basic CRUD
    #
    
    # Index // List
    get '/api/triples' do
      content_type 'application/json'
      { 'content' => Array(Triples.all) }.to_json
    end
    
    # Create
    post '/api/triples' do
      opts = Triples.parse_json(request.body.read) rescue nil
      halt(401, 'Invalid Format') if opts.nil?
    
      triple = Triples.new(opts)
      halt(500, 'Could not save triple') unless triple.save
    
      response['Location'] = triple.url
      response.status = 201
    end
    
    # Read (:id)
    get '/api/triples/:id' do
      triple = Triples.get(params[:id]) rescue nil
      halt(404, 'Not Found') if triple.nil?
    
      content_type 'application/json'
      { 'content' => triple }.to_json
    end
    
    # Update (:id)
    put '/api/triples/:id' do
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
    delete '/api/triples/:id' do
      triple = Triples.get(params[:id]) rescue nil
      triple.destroy unless triple.nil?
    end


    def transversalJsonSearch(json_string, function)
      parser = Yajl::Parser.new
      json_string = getJson
      json = parser.parse("["+json_string+"]")
      # json = JSON2.parse(json_string)
      return extract_list(json)
      # JSON2.parse(json).each do |node|
    #    node.to_s + '<br>'
     # end
      #JSON2.parse(json).each_with_index do |node, indx|
    #     node[indx].to_json
         # indx.to_s
     # end 
    end


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



 # Main Class 
 class Application < Sinatra::Base

            
    
    register Sinatra::RespondTo
    register Sinatra::SPARQL
    
    helpers Sinatra::Partials
    set :views, ::File.expand_path('../views',  __FILE__)
    DOAP_NT = File.expand_path("../../../../etc/doap.nt", __FILE__)
    DOAP_JSON = File.expand_path("../../../../etc/doap.jsonld", __FILE__)
    set :public_folder, File.expand_path("../../../../public", __FILE__)
    
    mime_type "sse", "application/sse+sparql-query"
    
    before do
      # $logger.info "[#{request.path_info}], #{params.inspect}, #{format}, #{request.accept.inspect}"
    end

    # localhost:8008 points to a 4store database
    SPARQLendpoint = 'http://localhost:8008/sparql/'
    IMPORTendpoint = 'http://localhost:8008/data/'
    
    SITEtitle = "Kosa - KOS aggregator"

    # instructs DataMapper to setup your database
    DataMapper.auto_upgrade!

    # Helpers: used?
    def bs_styled_flash(key=:flash)
      return "" if flash(key).empty?
        id = (key == :flash ? "flash" : "flash_#{key}")
        messages = flash(key).collect {|message| "  <div class='alert alert-#{message[0]}'>#{message[1]}</div>\n"}
        "\n" + messages.join + ""
    end
    # /Helpers
    

    def index
        # cache_control :public, :must_revalidate, :max_age => 60
        result = erb :index, :locals => {:title => SITEtitle}
        # etag result.hash
        result
    end
    
    def sparql
        # cache_control :public, :must_revalidate, :max_age => 60
        result = erb :sparql2, :locals => {:title => SITEtitle}
        # etag result.hash
        result
    end
    def signin
        # cache_control :public, :must_revalidate, :max_age => 60
        result = erb :signin, :locals => {:title => SITEtitle}
        # etag result.hash
        result
    end


    #
    #				ERROR HANDLING!!
    #

   #$showExceptions = Sinatra::ShowExceptions.new(self)
   
   #error do
    # @error = env['sinatra.error']
    # $showExceptions.pretty(env, @error)
   #end
       
   not_found do
     "<H2>Your page cannot be found<H2>"
   end

    #
    #				MAIN MENU NAVIGATION!
    #

    # @TODO : not complete
    #
    post '/upload' do
      unless  defined?(params)
    
        tempfile = params['file'][:tempfile]
        filename = params['file'][:filename]
        FileUtils.cp(tempfile.path , "files/#{filename}")
        flash[:success] = "upload succeded"
      else
        # flash[:danger] = "upload failed"
      end
      import
    end
    
    # static page routes
    get '/' do
      index
    end
    get '/sparql' do
      sparql
    end
    get '/signin' do
      signin
    end
    # // end static page routes



    #
    #				RESTful API - HELPERS!
    #
=end
=begin
    # same funct in JS
    function traverse(o,func) {
    for (var i in o) {
        func.apply(this,[i,o[i]]);  
        if (o[i] !== null && typeof(o[i])=="object") {
            //going on step down in the object tree!!
            traverse(o[i],func);
        }
    }
   }
=end
    
=begin


=end
=begin
    def extract_list(hash, collect = false)
      hash.map do |k, v|
        v.is_a?(Hash) ? extract_list(v, (k == "children")) : (collect ? v : nil)
      end.compact.flatten
    end

    #
    # Not used, used Siren Ruby Gem to move along the JSON 
    #
    def recursive_find( key, object )
      case object
      when Array
        object.each do |el|
          if el.is_a?(Hash) || el.is_a?(Array)
            res = recursive_find( key, el )
            return res if res
          end
        end
      when Hash
        return object[key] if object.has_key?( key )
        object.each do |k,v|
          if v.is_a?(Hash) || v.is_a?(Array)
            res = recursive_find( key, v )
            return res if res
          end
        end
      end
      nil
    end
=end    



=begin
    
    #
    #				SPARQL API!
    #
    

    def sparqlService(queryString="")
      
       # cache_control :public, :must_revalidate, :max_age => 60
       # queryString = params[:q]
    
           
       # 1st aproximations using restclient & nokogiri GEMs
       response = RestClient.post SPARQLendpoint, :query => queryString
    
       # puts "Response #{response.code}"
       xml = Nokogiri::XML(response.to_str)
    
       content_type 'text/plain'
         concatenated_items = "";
       
         xml.xpath('//sparql:binding/sparql:uri', 'sparql' => 'http://www.w3.org/2005/sparql-results#').each_with_index do |item, indx|
             concatenated_items = concatenated_items + "<br>" + item.content
             if indx % 3 == 0 
             #   b = 2
               concatenated_items = concatenated_items + "<br>"
             end
         end
         concatenated_items.to_s + "<br>"
         # end

     # no way --> 406 error in javascript<--- back to 1st aprox..
     # 2nd aproximation using sparql-client GEM

     #      sparql = SPARQL::Client.new(SPARQLendpoint)
     
     #      query = sparql.query(queryString)
     
     #      # query.inspect
     #      content_type 'application/json'
     #      #content_type 'application/sparql-results+json'
     #      query.each_solution do |s|
     #        s.inspect
     #      #   # s.inspect
     #      #   # puts s
     #      end  
    end

    
    # SPARQL Query api
    post "/api/sparqlQuery" do
      queryString = params[:q]
      sparqlService queryString
    end

    # SPARQL Query api
    post "/api/sparqlQuery.json" do
      queryString = params[:q]
      sparqlService queryString
    end



    
    #
    #				HELPERS!
    #

    get '/doap' do
      # cache_control :public, :must_revalidate, :max_age => 60
      case format
      when :nt
        # etag Digest::SHA1.hexdigest File.read(DOAP_NT)
        headers "Content-Type" => "application/n-triples; charset=utf-8"
        body File.read(DOAP_NT)
      when :json, :jsonld
        # etag Digest::SHA1.hexdigest File.read(DOAP_JSON)
        headers "Content-Type" => format == :jsonld ? "application/ld+json; charset=utf-8" : "application/json; charset=utf-8"
        body File.read(DOAP_JSON)
      when :html
        # etag Digest::SHA1.hexdigest File.read(DOAP_JSON)
        projects = ::JSON.parse(File.read(DOAP_JSON))['@graph']
        
        # Fix dc:created and doap:helper entries to be normalized
        projects.each do |p|
          devs = p['doap:developer'].inject({}) {|memo, h| memo[h['@id']] = h if h.is_a?(Hash); memo}
          p['dc:creator'].map! {|u| u.is_a?(String) && devs.has_key?(u) ? devs[u] : u}
          p['doap:helper'].map! {|u| u.is_a?(String) && devs.has_key?(u) ? devs[u] : u}
        end
        haml :doap, :locals => {
          :title => "Project Information on included Gems",
          :projects => projects
        }
      else
        # etag Digest::SHA1.hexdigest File.read(DOAP_NT)
        doap
      end
    end

    get '/tools' do
      # cache_control :public, :must_revalidate, :max_age => 60
      distil
    end

    post '/tools' do
      distil
    end
    
    get '/sparqld' do
      # cache_control :public, :must_revalidate, :max_age => 60
      sparqld
    end

    post '/sparqld' do
      sparqld
    end
    
    
    # for Specs compliance
    get '/distiller' do
      # cache_control :public, :must_revalidate, :max_age => 60
      sparqld
    end
    post '/distiller' do
      sparqld
    end

       


    private

    # Handle GET/POST
    def distil
      writer_options = {
        :standard_prefixes => true,
        :prefixes => {},
        :base_uri => params["uri"],
      }
      writer_options[:format] = params["fmt"] || params["format"] || "turtle"

      content = parse(writer_options)
      
       
      
      # # $logger.debug "distil content: #{content.class}, as type #{(writer_options[:format] || format).inspect}"

      if writer_options[:format].to_s == "rdfa"
        # If the format is RDFa, use specific HAML writer
        haml_input = DISTILLER_HAML.dup
        root = request.url[0,request.url.index(request.path)]
        haml_input[:doc] = haml_input[:doc].gsub(/--root--/, root)
        writer_options[:haml] = haml_input
        writer_options[:haml_options] = {:ugly => false}
      end
      settings.sparql_options.replace(writer_options)

      if format != :html || params["raw"]
        # Return distilled content as is
        content
      else
        @output = case content
        when RDF::Enumerable
          # For HTML response, the "fmt" attribute may set the type of serialization
          fmt = (writer_options[:format] || "turtle").to_sym
          content.dump(fmt, writer_options)
        else
          content
        end
        @output.force_encoding(Encoding::UTF_8) if @output
        # @output.force_encoding('UTF-8') if @output

      #
      #	IMPORT
      #


       
      if !@output.nil? && !writer_options[:base_uri].nil? 
        # vocabulary = [('a'..'z'), ('A'..'Z')].map { |i| i.to_a }.flatten
        # randomFilename = (0..15).map{ vocabulary[rand(vocabulary.length)] }.join
        
        repository = RDF::FourStore::Repository.new(IMPORTendpoint)
        # puts repository.count
        repository.load!(writer_options[:base_uri])
        # puts repository.count
        # repository.load(@output.to_s.force_encoding('UTF-8'))

        #file = Tempfile.new(randomFilename)
        #file.write(@output);
        
      end
        haml :kosa, :locals => {:title => SITEtitle}
      end
    end

    # Handle GET/POST /sparqld
    def sparqld
      writer_options = {
        :standard_prefixes => true,
        :prefixes => {
          :ssd => "http://www.w3.org/ns/sparql-service-description#",
          :void => "http://rdfs.org/ns/void#"
        }
      }
      # Override output format if the content-type is something like
      # application/sparql-results, as sinatra-respond_to won't find
      # the right extension.
      if request.accept.first =~ %r(application/sparql-results\+([^,;]+))
        params["fmt"] = (format $1.to_sym)
      end

      # Override output format if returning something that is raw, or if
      # the "fmt" argument is used and the output format isn't HTML
      params["fmt"] ||= params["format"] if params.has_key?("format") # likely alias
      format :xml if format == :xsl # Problem with content detection
      format params["fmt"] if params["raw"] && params.has_key?("fmt")
      format params["fmt"] if params.has_key?("fmt") && format != :html
      # Make sure we get a format symbol, not an extension
      params["fmt"] ||= RDF::Format.for(:file_extension => format) unless RDF::Format.for(format)

      content = query

      if params["fmt"].to_s == "rdfa"
        # If the format is RDFa, use specific HAML writer
        haml = DISTILLER_HAML.dup
        root = request.url[0,request.url.index(request.path)]
        haml[:doc] = haml[:doc].gsub(/--root--/, root)
        writer_options[:haml] = haml
        writer_options[:haml_options] = {:ugly => false}
      end

      # $logger.info "sparql content: #{content.class}, as type #{format.inspect} with options #{writer_options.inspect}"
      if format != :html
        writer_options[:format] = params["fmt"]
        settings.sparql_options.replace(writer_options)
        content
      else
        serialize_options = {
          :format => params["fmt"],
          :content_types => request.accept
        }
        begin
          @output = if params["fmt"] == "sse"
            content
          else
            # $logger.debug "content-type: #{headers['Content-Type'].inspect}"
            SPARQL.serialize_results(content, serialize_options)
          end
        @output.force_encoding(Encoding::UTF_8) if @output
        rescue RDF::WriterError => e
          @error = "No results generated #{content.class}: #{e.message}"
        end
        erb :sparql, :locals => {
          :title => "SPARQL Endpoint",
          :head => :kosa,
          :doap_count => doap.count
        }
      end
    end

    # Format symbol for RDF formats
    # @param [Symbol] reader_or_writer
    # @return [Array<Symbol>] List of format symbols
    def formats(reader_or_writer = nil)
      # Symbols for different input formats
      RDF::Format.each.to_a.map(&:reader).compact.map(&:to_sym)
    end

    ## Default graph, loaded from DOAP file
    def doap
      @doap ||= begin
        # $logger.debug "load #{DOAP_NT}"
        RDF::Repository.load(DOAP_NT, :encoding => Encoding::UTF_8)
      end
    end

    # Parse the an input file and re-serialize based on params and/or content-type/accept headers
    def parse(options)
      reader_opts = options.merge(
        :validate        => params["validate"],
        :vocab_expansion => params["vocab_expansion"],
        :rdfagraph       => params["rdfagraph"]
      )
      reader_opts[:format] = params["in_fmt"].to_sym unless (params["in_fmt"] || 'content') == 'content'
      reader_opts[:debug] = @debug = [] if params["debug"]
      
      graph = RDF::Repository.new
      in_fmt = params["in_fmt"].to_sym if params["in_fmt"]

      # Load data into graph
      case
      when !params["content"].to_s.empty?
        raise RDF::ReaderError, "Specify input format" if in_fmt.nil? || in_fmt == :content
        @content = ::URI.unescape(params["content"])
        # $logger.info "Open form data with format #{in_fmt} for #{@content.inspect}"
        reader = RDF::Reader.for(reader_opts[:format] || reader_opts)
        reader.new(@content, reader_opts) {|r| graph << r}
      when !params["uri"].to_s.empty?
        # $logger.info "Open uri <#{params["uri"]}> with format #{in_fmt}"
        
        reader = RDF::Reader.open(params["uri"], reader_opts) {|r| graph << r}
        params["in_fmt"] = reader.class.to_sym if in_fmt.nil? || in_fmt == :content
      else
        graph = ""
      end

      # $logger.info "parsed #{graph.count} statements" if graph.is_a?(RDF::Graph)
      graph
    rescue Errno::ENOENT => e
      @error = "Errno::ENOENT: #{e.message}" 
      nil
    rescue RDF::ReaderError => e
      @error = "RDF::ReaderError: #{e.message}"
      # $logger.error @error  # to log
      nil
    rescue
      raise unless settings.environment == :production
      @error = "#{$!.class}: #{$!.message}"
      # $logger.error @error  # to log
      nil
    end

    # Perform a SPARQL query, either on the input URI or the form data
    def query
      sparql_opts = {
        :base_uri => params["uri"],
        :validate => params["validate"],
      }
      
      sparql_opts[:format] = params["fmt"].to_sym if params["fmt"]
      sparql_opts[:debug] = @debug = [] if params["debug"]

      sparql_expr = nil
      repo = nil

      case
      when !params["query"].to_s.empty?
        @query = params["query"]
        # $logger.info "Open form data: #{@query.inspect}"
        # Optimization for RDFa Test suite
        repo = RDF::Repository.new if @query.to_s =~ /ASK FROM/
        sparql_expr = SPARQL.parse(@query, sparql_opts)
      when !params["uri"].to_s.empty?
        # $logger.info "Open uri <#{params["uri"]}>"
        RDF::Util::File.open_file(params["uri"]) do |f|
          sparql_expr = SPARQL.parse(f, sparql_opts)
        end
      else
        # Otherwise, return service description
        # $logger.info "Service Description"
        return case format
        when :html
          ""  # Done in form
        else
          # Return service description graph
          service_description(:repository => doap, :endpoint => url("/sparqld"))
        end
      end

      raise "No SPARQL query created" unless sparql_expr

      if params["fmt"].to_s == "sse"
        headers = ["Content-Type" => "application/sse+sparql-query; charset=utf-8"]
        return sparql_expr.to_sse
      end

      # $logger.debug "execute query"
      repo ||= doap
      sparql_expr.execute(repo, sparql_opts)
    rescue SPARQL::Grammar::Parser::Error, SPARQL::MalformedQuery, TypeError
      @error = "#{$!.class}: #{$!.message}"
      # $logger.error @error  # to log
      nil
    rescue
      raise unless settings.environment == :production
      @error = "#{$!.class}: #{$!.message}"
      # $logger.error @error  # to log
      nil
    end
    
    private
    def format_version(format)
      if %w(RDF::NTriples::Format RDF::NQuads::Format).include?(format.to_s)
        # return RDF::VERSION
        return "0.0.0"
      else
        format.to_s.split('::')[0..-2].inject(Kernel) {|mod, name| mod.const_get(name)}.const_get('VERSION')
      end
    end
  end

end 
# module
=end

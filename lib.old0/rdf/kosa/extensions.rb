# encoding: UTF-8

require 'rdf/util/file'
require 'curb'

# set :raise_errors, false
#set :show_exceptions, false

#$showExceptions = Sinatra::ShowExceptions.new(self)
#
#error do
#  @error = env['sinatra.error']
#  $showExceptions.pretty(env, @error)
#end
#
module RDF::Util
  module File
    ##
    # Override to use Patron for http and https, Kernel.open otherwise.
    #
    # @param [String] filename_or_url to open
    # @param  [Hash{Symbol => Object}] options
    # @option options [Array, String] :headers
    #   HTTP Request headers.
    # @return [IO] File stream
    # @yield [IO] File stream
    def self.open_file(filename_or_url, options = {}, &block)
      case filename_or_url.to_s
      when /^file:/
        path = filename_or_url[5..-1]
        Kernel.open(path.to_s, &block)
      when /^http/
        io_obj = StringIO.new
        c = Curl::Easy.perform(filename_or_url) do |curl|
          curl.headers['Accept'] = 'text/turtle, application/rdf+xml;q=0.8, application/ld+json;q=0.8, text/plain;q=0.4, */*;q=0.1'
          curl.headers['User-Agent'] = "kosa-dev"
          curl.follow_location = true
          curl.on_body {|body| io_obj.write(body); body.length}
          #curl.on_debug {|type, data| STDERR.puts "type: #{type.inspect}, data: #{data.inspect}"}
          curl.on_success {|easy, code| io_obj.instance_variable_set(:@status, code || 200)}
          curl.on_failure {|easy, code| io_obj.instance_variable_set(:@status, code || 500)}
        end
        io_obj.rewind

        content_type, ct_param = c.content_type.to_s.downcase.split(";")
        io_obj.instance_variable_set(:@content_type, content_type) unless content_type.to_s.empty?
        
        # Set charset, if available
        if ct_param.to_s =~ /charset=([^\s]*)$/i
          io_obj.instance_variable_set(:@charset, $1)
        end

        def io_obj.content_type
          @content_type
        end
        def io_obj.charset
          @charset
        end
        def io_obj.status
          @status
        end
        if block_given?
          begin
            block.call(io_obj)
          ensure
            io_obj.close
          end
        else
          io_obj
        end
      else
        Kernel.open(filename_or_url.to_s, &block)
      end
    end
  end
end

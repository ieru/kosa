# encoding: UTF-8

# #!/usr/bin/env rackup
# #\ -w -p 4568

$:.unshift(File.expand_path('../lib',  __FILE__))

 
require 'rubygems' || Gem.clear_paths
require 'bundler'
Bundler.setup
require 'sinatra'
require 'dalli'
require 'rack/cache'
require 'logger'

# Rackup stuff:
require File.expand_path '../lib/application.rb', __FILE__


# Global config
set :logging, true
set :raise_errors, true
set :show_exceptions, true
set :static, true
set :root, File.dirname(__FILE__) 
set :environment, (ENV['RACK_ENV'] || 'production').to_sym


# LOGGING

if settings.environment == :production
  puts "Mode set to #{settings.environment.inspect}, logging to sinatra.log"
  $logger = Logger.new('sinatra.log', 10, 3600*24*7)
else
  puts "Mode set to #{settings.environment.inspect}, logging to console"
  $logger = Logger.new(STDOUT)
  $logger.formatter = lambda {|severity, datetime, progname, msg| "#{msg}\n"}
end

# CACHING

# Defined in ENV on Heroku. To try locally, start memcached and uncomment next line:
#ENV["MEMCACHE_SERVERS"] = "localhost"

if memcache_servers = ENV["MEMCACHE_SERVERS"]
  use Rack::Cache,
  :verbose=> true,
  :metastore=>   "memcached://#{memcache_servers}",
  :entitystore=> "memcached://#{memcache_servers}"
else
  # File Cachestore
  use Rack::Cache,
  :verbose     => true,
  :metastore   => "file:" + File.expand_path("../cache/meta", __FILE__),
  :entitystore => "file:" + File.expand_path("../cache/body", __FILE__)
end


disable :run, :reload


use Rack::Session::Cookie, secret: "nothingissecretontheinternet"
use Rack::Flash, accessorize: [:error, :success]

use Warden::Manager do |config|

  config.serialize_into_session{|user| user.id }

  config.serialize_from_session{|id| User.get(id) }

  config.scope_defaults :default,

    strategies: [:password],

    action: 'auth/unauthenticated'

  config.failure_app = self
end


# Bootstrap
# classic:
# run Sinatra::Application
# modular:
run Kosa

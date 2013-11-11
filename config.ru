# encoding: UTF-8
# # #!/usr/bin/env rackup
# # #\ -w -p 4568
# # #$:.unshift(File.expand_path('../lib',  __FILE__))

 
require 'rubygems' || Gem.clear_paths
require 'bundler'
Bundler.setup
require 'sinatra'
require 'application'

require 'rack/cache'
require 'logger'

set :logging, false
set :raise_errors, true
set :show_exceptions, true
set :static, true
set :root, File.dirname(__FILE__) 
set :environment, (ENV['RACK_ENV'] || 'production').to_sym


if settings.environment == :production
  puts "Mode set to #{settings.environment.inspect}, logging to sinatra.log"
  $logger = Logger.new('sinatra.log', 10, 3600*24*7)
else
  puts "Mode set to #{settings.environment.inspect}, logging to console"
  $logger = Logger.new(STDOUT)
  $logger.formatter = lambda {|severity, datetime, progname, msg| "#{msg}\n"}
end

use Rack::Cache,
  :verbose     => true,
  :metastore   => "file:" + File.expand_path("../cache/meta", __FILE__),
  :entitystore => "file:" + File.expand_path("../cache/body", __FILE__)

disable :run, :reload

run Sinatra::Application

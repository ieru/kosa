#!/usr/bin/env ruby -rubygems
# -*- encoding: utf-8 -*-

require 'date'

Gem::Specification.new do |s|
  s.version            = '0.1'
  s.date               = Date.today.to_s
  s.name               = 'kosa'
  s.homepage           = 'https://github.com/ieru/kosa'
  s.license            = 'Public Domain'
  s.summary            = 'A lightweight aggregator of Knowledge Organization Systems (KOS)'
  s.description        = s.summary

  s.authors            = ['www.uah.es']
  s.email              = ''

  s.platform           = Gem::Platform::RUBY
  s.files              = %w(README.md) + Dir.glob('lib/*.rb')
  s.bindir             = %q(bin)
  s.executables        = %w()
  s.default_executable = s.executables.first
  s.require_paths      = %w(lib)
  s.extensions         = %w()
  s.test_files         = Dir.glob('spec/*.rb')
  s.has_rdoc           = false

  s.required_ruby_version      = '>= 1.8.7'
  s.requirements               = []

  # RDF dependencies
  s.add_runtime_dependency        'linkeddata',         '>= 1.0'
  s.add_runtime_dependency        'rdf'     #,		'=1.0.10'
  # s.add_runtime_dependency      'equivalent-xml',     '>= 0.3.0'
  # s.add_runtime_dependency      'sparql',             '>= 1.0'
  # s.add_runtime_dependency      'curb',               '>= 0.8.3'

  # Sinatra dependencies        
  s.add_runtime_dependency      'sinatra',            '>= 1.3.3'
  s.add_runtime_dependency      'erubis',             '>= 2.7.0'
  s.add_runtime_dependency      'haml'
  s.add_runtime_dependency      'maruku'
  s.add_runtime_dependency      'rack',               '>= 1.4.4'
  s.add_runtime_dependency      'sinatra-respond_to', '>= 0.8.0'
  s.add_runtime_dependency      'rack-cache'

  # development dependencies    
  # s.add_development_dependency  'yard'
  s.add_development_dependency  'rspec',              '>= 2.12.0'
  # s.add_development_dependency  'rack-test',          '>= 0.6.2'
  s.add_development_dependency  'bundler'
  # s.add_development_dependency  'rdf-do'
  s.post_install_message        = nil
end

require 'sinatra'

module RDF
  module Kosa
    autoload :DISTILLER_HAML, 'rdf/kosa/rdfa_template'
    autoload :Application,    'rdf/kosa/application'
  end
end

# app.rb
set :haml, :format => :html5

require 'haml'
 
get "/" do
   haml :index
end

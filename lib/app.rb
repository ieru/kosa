# app.rb
set :haml, :format => :html5
 
get "/" do
  haml :index
end

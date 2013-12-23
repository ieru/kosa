require 'sinatra/base'
require 'bundler'
require 'yajl/json_gem'

Bundler.require

# load the Database and User model
require 'auth/user.model'

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


module Sinatra
  module AuthRoutes

  class Auth 
  
   attr_reader :encoder
  
   def initialize 
     @encoder = Yajl::Encoder.new 
   end
  

   end
  
    def self.registered( app ) 

  Warden::Manager.before_failure do |env,opts|
    env['REQUEST_METHOD'] = 'POST'
  end

  Warden::Strategies.add(:password) do
    def valid?
      params['user'] && params['user']['username'] && params['user']['password']
    end

    def authenticate!
      user = User.first(username: params['user']['username'])

      if user.nil?
        # fail!("The username you entered does not exist.")
        # flash.error = ""
        "error"
       elsif user.authenticate(params['user']['password'])
        # flash.success = "Successfully Logged In"
        # success!(user)
        "success"
      else
        "error2"
        #fail!("Could not log in")
      end
    end
  end



  app.get '/auth_test' do
    "auth test"
  end

  app.get '/auth/login' do
    # erb :login
    "login"
  end

  app.post '/auth/login' do
    env['warden'].authenticate!

    #flash.success = env['warden'].message

    if session[:return_to].nil?
      redirect '/'
    else
      redirect session[:return_to]
    end
  end

  app.get '/auth/logout' do
    env['warden'].raw_session.inspect
    env['warden'].logout
    # flash.success = 'Successfully logged out'
    # redirect '/'
  end

  app.post '/auth/unauthenticated' do
    session[:return_to] = env['warden.options'][:attempted_path]
    puts env['warden.options'][:attempted_path]
    # flash.error = env['warden'].message || "You must log in"
    # redirect '/auth/login'
  end

  app.get '/protected' do
    env['warden'].authenticate!

    # erb :protected
  end
  
    end
  end
  register AuthRoutes
end


=begin
class Auth < Sinatra::Base
  

  get '/auth/logout' do
    env['warden'].raw_session.inspect
    env['warden'].logout
    flash.success = 'Successfully logged out'
    redirect '/'
  end

  post '/auth/unauthenticated' do
    session[:return_to] = env['warden.options'][:attempted_path]
    puts env['warden.options'][:attempted_path]
    flash.error = env['warden'].message || "You must log in"
    redirect '/auth/login'
  end

  get '/protected' do
    env['warden'].authenticate!

    erb :protected
  end
end
=end

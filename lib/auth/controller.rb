require 'bundler'
Bundler.require

# load the Database and User model
require 'auth/model'

class Auth
  
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
        fail!("The username you entered does not exist.")
        # flash.error = ""
      elsif user.authenticate(params['user']['password'])
        # flash.success = "Successfully Logged In"
        success!(user)
      else
        fail!("Could not log in")
      end
    end
  end


end


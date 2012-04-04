require_relative '../proposalr.rb'
require 'rack/test'
require_relative '../basic_auth_credentials'

set :environment, :test

describe 'Proposalr' do
  include Rack::Test::Methods

  def app
    Sinatra::Application
  end

  def encode_credentials(username, password)
    "Basic " + Base64.encode64("#{username}:#{password}")
  end
  
  it "require basic auth" do
    get '/'
    last_response.status.should == 401
    get '/', {}, {'HTTP_AUTHORIZATION'=> encode_credentials('wrong', 'credentials')}
    last_response.status.should == 401
    get '/', {}, {'HTTP_AUTHORIZATION'=> encode_credentials(settings.username, settings.password)}
    last_response.status.should == 200
  end
end



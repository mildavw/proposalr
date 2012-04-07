ENV['RACK_ENV'] = 'test'

require_relative '../proposalr.rb'
require_relative '../basic_auth_credentials'
require_relative '../local_email_settings'
require 'rack/test'

describe 'Proposalr' do
  include Rack::Test::Methods

  after :each do
    Document.destroy
  end

  def app
    Sinatra::Application
  end

  def encode_credentials(username, password)
    "Basic " + Base64.encode64("#{username}:#{password}")
  end

  def auth_get(path)
    get path, {}, {'HTTP_AUTHORIZATION' => encode_credentials(settings.username, settings.password)}
  end

  def auth_post(path, params)
    post path, params, {'HTTP_AUTHORIZATION' => encode_credentials(settings.username, settings.password)}
  end

  describe 'basic auth' do
    it "is required" do
      get '/'
      last_response.status.should == 401

      get '/', {}, {'HTTP_AUTHORIZATION'=> encode_credentials('wrong', 'credentials')}
      last_response.status.should == 401

      get '/', {}, {'HTTP_AUTHORIZATION'=> encode_credentials(settings.username, settings.password)}
      last_response.status.should == 200
    end
  end

  describe 'sinatra app' do

    it "lists all documents" do
      Document.create!(:filename => 'Foo', :serialized_data => '')
      Document.create!(:filename => 'Bar', :serialized_data => '')
      auth_get('/')
      last_response.body.should =~ /Foo/
      last_response.body.should =~ /Bar/
    end

    describe '#save' do
      it 'returns a 500 with error messages if invalid' do
        doc = Document.create!(:filename => 'Foo', :serialized_data => '')
        response = auth_post('/save', {:filename => 'Foo'})
        response.status.should == 500
        response.body.should =~ /Serialized data must not be blank/
      end
      it 'updates a document when it has an id' do
        doc = Document.create!(:filename => 'Foo', :serialized_data => '')
        response = auth_post('/save', { :filename => 'Bar',
                                        :document_id => doc.id.to_s,
                                        :key => 'val' })
        Document.get(doc.id).filename.should == 'Bar'
        response.status.should == 200
      end
      it "creates a new document when it doesn't have an id" do
        response = auth_post('/save', {:filename => 'Bar', :key => 'val'})
        Document.first.filename.should == 'Bar'
        response.status.should == 200
      end
    end

    it "deletes a document" do
      Document.create!(:filename => 'Foo', :serialized_data => '')
      target = Document.create!(:filename => 'Bar', :serialized_data => '')
      auth_get('/delete/%d' % target.id)
      Document.get(target.id).should be_nil
    end

    it "returns a document json data" do
      Document.create!(:filename => 'Foo', :serialized_data => '')
      target = Document.create!(:filename => 'Bar', :serialized_data => 'json_string')
      auth_get('/%d' % target.id)
      last_response.body.should == 'json_string'
    end

    it "returns a pdf version of the document for download" do
      auth_post('/pdf', {:filename => 'Bar'})
      last_response.header["Content-Type"].should == "application/pdf"
      last_response.header["Content-Disposition"].should == "attachment; filename=Bar.pdf"
      last_response.body.should =~ /\A\%PDF/
    end

    it "returns an HTML version of the document" do
      auth_post('/html', {:filename => 'Bar'})
      last_response.body.should =~ /\A<html>/
    end

  end

end
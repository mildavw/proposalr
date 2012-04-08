ENV['RACK_ENV'] = 'test'

require_relative '../proposalr.rb'
require_relative '../basic_auth_credentials'
require_relative '../local_email_settings'
require 'capybara'
require 'capybara/dsl'
require 'capybara/rspec'

describe 'front end' do
  include Capybara::DSL
  Capybara.default_driver = :selenium
  Capybara.app = Sinatra::Application.new

  after :each do
    Document.destroy
  end

  def auth_visit(path)
    url = 'http://%s:%s@%s:%s%s' % [settings.username,
                                    settings.password,
                                    page.driver.rack_server.host,
                                    page.driver.rack_server.port,
                                    path]
    visit url
  end

  it 'New Document button shows a new blank form' do
    auth_visit '/'
    page.should have_css('div#new', :visible => false)
    click_button 'New Document'
    page.should have_css('div#new', :visible => true)
  end

  it 'Preview button shows the html preview in a new window' do
    auth_visit '/'
    click_button 'New Document'
    click_button 'Preview'
    pdb = page.driver.browser
    pdb.switch_to.window(pdb.window_handles.last)
    page.should have_xpath("//title", :text => "Untitled")
  end

  it 'View PDF button downloads a PDF'
    # auth_visit '/'
    # click_button 'New Document'
    # click_button 'View PDF'
  # end

  describe 'Email PDF button' do
    it 'prompts for an address and sends the email with PDF attached' do
      auth_visit '/'
      click_button 'New Document'
      click_button 'Email PDF'
      page.driver.browser.switch_to.alert.accept
      page.should have_css("#message", :text => "Sending...")
    end

    it 'prompts for an address and does nothing if user cancels' do
      auth_visit '/'
      click_button 'New Document'
      click_button 'Email PDF'
      page.driver.browser.switch_to.alert.dismiss
      page.should_not have_css("#message", :text => "Sending...")
    end

  end

  it 'Save button saves something' do
    auth_visit '/'
    click_button 'New Document'
    n = Document.count
    click_button 'Save'
    wait_until{ page.has_css?("#message", :text => "")}
    Document.count.should == n+1
  end

  describe 'Saved Proposals button' do
    describe 'prompts for saving changes if the current proposal is unsaved' do
      it 'and saves if accepted' do
        auth_visit '/'
        click_button 'New Document'
        n = Document.count
        click_button 'Saved Documents'
        page.driver.browser.switch_to.alert.accept
        Document.count.should == n+1
        page.should have_css('div#index', :visible => true)
      end

      it 'and does not save if canceled' do
        auth_visit '/'
        click_button 'New Document'
        n = Document.count
        click_button 'Saved Documents'
        page.driver.browser.switch_to.alert.dismiss
        Document.count.should == n
        page.should have_css('div#index', :visible => true)
      end
    end
    
    it 'shows the index page with no prompt if the current proposal is saved' do
      auth_visit '/'
      click_button 'New Document'
      click_button 'Save'
      wait_until{ page.has_css?("#message", :text => "")}
      click_button 'Saved Documents'
      page.should have_css('div#index', :visible => true)
    end

  end
end
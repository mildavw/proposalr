require 'spec_helper'

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
    page.execute_script("config.filename = function(){return 'Foo';}")
    click_button 'Preview'
    pdb = page.driver.browser
    pdb.switch_to.window(pdb.window_handles.last)
    page.should have_xpath("//title", :text => "Foo")
  end

  it 'View PDF button downloads a PDF'
    # auth_visit '/'
    # click_button 'New Document'
    # click_button 'View PDF'
  # end

  describe 'Email PDF button' do
    before :each do
      auth_visit '/'
      click_button 'New Document'
      click_button 'Email PDF'
    end
    it 'prompts for an address and sends the email with PDF attached' do
      page.driver.browser.switch_to.alert.accept
      page.should have_css("#message", :text => "Sending...")
    end
    it 'prompts for an address and does nothing if user cancels' do
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
    describe 'does not prompt to save changes' do
      it 'if the current proposal is new and as yet unmodified' do
        auth_visit '/'
        click_button 'New Document'
        click_button 'Saved Documents'
        page.should have_css('div#index', :visible => true)
      end
      it 'if the current proposal is already saved' do
        auth_visit '/'
        click_button 'New Document'
        click_button 'Save'
        wait_until{ page.has_css?("#message", :text => "")}
        click_button 'Saved Documents'
        page.should have_css('div#index', :visible => true)
      end
    end
    describe 'prompts for saving changes if the current proposal is unsaved' do
      before :each do
        auth_visit '/'
        click_button 'New Document'
        page.execute_script("$('input[name=filename]').val('foo')")
        @n = Document.count
        click_button 'Saved Documents'
      end
      it 'and saves if accepted' do
        page.driver.browser.switch_to.alert.accept
        Document.count.should == @n+1
        page.should have_css('div#index', :visible => true)
      end
      it 'and does not save if canceled' do
        page.driver.browser.switch_to.alert.dismiss
        Document.count.should == @n
        page.should have_css('div#index', :visible => true)
      end
    end

  end
end
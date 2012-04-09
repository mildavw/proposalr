require 'spec_helper'

describe 'EJPs configuration behavior' do
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

  it "Today button fills in today's date"
  it '2 Weeks button fills in option date'
  it 'Calculate 2 button fills in 1 payment date'
  it 'Calculate 4 button fills in 3 payment dates'
end
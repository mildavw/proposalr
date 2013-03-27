ENV['RACK_ENV'] = 'test'

require_relative '../proposalr'
require_relative '../basic_auth_credentials'
require_relative '../local_email_settings'
require 'rack/test'
require 'capybara'
require 'capybara/dsl'
require 'capybara/rspec'
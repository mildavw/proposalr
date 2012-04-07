source "http://rubygems.org"

gem "sinatra"
gem "pdfkit"
gem "json"
gem "pony"
gem "data_mapper"

group :production do
  gem 'dm-postgres-adapter'
end

group :development, :test do
  gem 'heroku'
  gem 'shotgun'
  gem 'dm-sqlite-adapter'
  gem 'ruby-debug19'
  gem 'capybara'
  gem 'rspec'
end
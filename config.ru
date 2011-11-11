require './proposalr.rb'
PDFKit.configure do |config|       
  config.wkhtmltopdf = File.join('bin', 'wkhtmltopdf-amd64').to_s
end
run Sinatra::Application
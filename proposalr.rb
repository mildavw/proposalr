# encoding: UTF-8
require 'rubygems'
require 'sinatra'
require 'pdfkit'
require 'cgi'
require 'json'
require 'pony'
require 'data_mapper'
require 'dm-timestamps'
# require 'ruby-debug'

require './basic_auth_credentials'
use Rack::Auth::Basic, "Restricted Area" do |username, password|
  [username, password] == [settings.username,settings.password]
end

set :email_username, ENV['SENDGRID_USERNAME']
set :email_password, ENV['SENDGRID_PASSWORD']
set :email_service, ENV['EMAIL_SERVICE']
set :email_domain, ENV['SENDGRID_DOMAIN']

if settings.environment == :development
  require './local_email_settings'
end

DataMapper.setup(:default, (ENV["DATABASE_URL"] || "sqlite3:///#{Dir.pwd}/development.sqlite3"))

class Document
  include DataMapper::Resource
  property :id, Serial
  property :filename, String, :required => true
  property :serialized_data, Text, :required => true
  property :created_at, DateTime
  property :updated_at, DateTime
end
DataMapper.auto_upgrade!

# docs index
get '/' do
  @docs = Document.all
  erb :index
end

# delete a doc
get '/delete/:id' do |id|
  doc = Document.get(id)
  (doc && doc.destroy) ? 200 : 409
end

# show a doc for editing
get %r{(\d+)} do |id|
  content_type :json
  doc = Document.get(id)
  doc ? doc.serialized_data : 409
end

# download/show a doc in specified format
post '/:filename.:format' do |filename, format|
  filename ||= 'untitled'
  output(filename, format, params)
end

# save a doc
post '/save/:filename' do |filename|
  params.delete('filename')
  document = Document.new(:filename => filename, :serialized_data => params.to_json)
  document.errors.join('<br/') if !document.save
end

#email a pdf
post '/email/:filename' do |filename|
  filename ||= 'untitled'
  filename << '.pdf'
  html = build_html(params)
  html = html.gsub(/src=\"\/images\//, 'src="file://'+`pwd`+'/public/images/')
  kit = PDFKit.new html
  begin
    Pony.mail({
      :to => params[:email_to],
      :from => 'no-reply@proposalr.heroku.com',
      :subject => "Your Proposalr Document - %s" % filename,
      :attachments => {filename => kit.to_pdf},
      :body => 'Attached.',
      :port => '587',
      :via => :smtp,
      :via_options => {
        :address              => 'smtp.' + settings.email_service,
        :port                 => '587',
        :enable_starttls_auto => true,
        :user_name            => settings.email_username,
        :password             => settings.email_password,
        :authentication       => :plain,
        :domain               => settings.email_domain}
    });
  rescue => e
    puts e.message
    e.message
  end
end


private

def output(filename, format, params)
  html = build_html(params)
  case format
  when 'pdf'
    html = html.gsub(/src=\"\/images\//, 'src="file://'+`pwd`+'/public/images/')
    pdf_out_memory(html, filename)
  else
    html
  end
end

def pdf_out_memory(html, filename)
  kit = PDFKit.new html
  headers({
    'Content-Disposition' => "attachment; filename=#{filename}.pdf",
    'Content-Type'        => 'application/pdf'})
  kit.to_pdf
end

def build_html(params)
  sections = {}
  params.each do |name, value|
    next unless name.match /^output/
    next if name.match /meta$/
    meta = JSON.parse( CGI::unescape( params[name+'_meta'] ) )

    heading = meta['hide_title'] ? '' : "<h3>#{meta['title']}</h3>"

    style = meta['style'] ? " style='#{meta['style']}'" : ''

    content = value.split(/\r?\n/).compact.join('<br/>')
    content.gsub!(/(«[^\W]*»)/, '<span style="color:red">\1</span>')

    sections[meta['sort'].to_i] = "<p%s>%s%s</p>" % [style, heading, content]
  end
  '<html><body style="font-family:times"><div>' + sections.sort.map {|k,v| v}.join('</div><div>') + '</div></body></html>'
end

def show_hash(hash)
  hash.map{|k,v| '<strong>%s</strong>:%s' % [k,v || CGI::escapeHTML(v)]}.sort.join('<hr/>')
end
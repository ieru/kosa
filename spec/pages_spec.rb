$:.unshift "."

require 'spec_helper'

describe "Kosa" do
  before(:each) do
    $debug_output = StringIO.new()
    $logger = Logger.new($debug_output)
    $logger.formatter = lambda {|severity, datetime, progname, msg| "#{msg}\n"}
  end

  describe "/" do
    it "gets OK response from /" do
      get '/'
      last_response['Content-Type'].should =~ %r{#{mime_type(:html)}}
      last_response.should be_ok
    end
  end
  
  describe "/test" do
    it "gets a OK response from /test, and content is what should be expected" do
      get '/test'
      last_response['Content-Type'].should =~ %r{#{mime_type(:html)}}
      last_response.should be_ok
      last_response.should match %r{test}
    end
  end
  
end

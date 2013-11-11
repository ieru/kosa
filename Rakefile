require 'rubygems'
require 'fileutils'

# add rake tasks here: e.g run 'rvm all do rake task1'

namespace :cache do
  desc 'Clear document cache'
  task :clear do
    FileUtils.rm_rf File.expand_path("../cache", __FILE__)
  end
end

desc "Sample task"
task :task1 do
  # require '..'
end
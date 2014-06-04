require 'bundler/capistrano'
require 'rvm/capistrano'
require 'capistrano-unicorn'

before 'deploy:setup', 'rvm:install_rvm'
before 'deploy:setup', 'rvm:install_ruby'

set :application, "fries"
set :repository, 'git@github.com:jaunesarmiento/fries.git'
set :scm, :git
set :scm_verbose, true
set :deploy_via, :remote_cache
# set :copy_compression, :gzip
# set :use_sudo, false

set :user, "deploy"

set :deploy_to, "/data/#{application}"
set :branch, "capistrano"
set :app_server, :unicorn
set :default_run_options, { pty: true }
set :ssh_options, { forward_agent: true }


role :web, "106.186.25.187"

# before 'deploy:update', 'deploy:update_jekyll'

namespace :deploy do
  [:start, :stop, :restart, :finalize_update].each do |t|
    desc "#{t} task is a no-op with jekyll"
    task t, :roles => :app do ; end
  end

  desc 'Run jekyll to update site before uploading'
  task :update_jekyll do
    # clear existing _site
    # build site using jekyll
    # remove Capistrano stuff from build
    %x(rm -rf _site/* && jekyll build && rm _site/Capfile && rm -rf _site/config)
  end
end
require 'bundler/capistrano'
require 'rvm/capistrano'

set :application, "fries"
set :repository, 'git@github.com:jaunesarmiento/fries.git'
set :scm, :git
set :scm_verbose, true
set :deploy_via, :remote_cache

set :user, "deploy"
set :password, "grabekadud3"
set :deploy_to, "/data/#{application}"
set :branch, "capistrano" # change this to "develop" after PR merge

set :default_run_options, { pty: true }
set :ssh_options, { forward_agent: true }

role :web, "106.186.25.187"

after "deploy:create_symlink" do
  run "rm -rf #{release_path}/config #{release_path}/Capfile"
  run "cd #{release_path} && jekyll build"
end
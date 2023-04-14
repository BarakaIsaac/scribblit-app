# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

# require_relative "config/application"
require 'active_record/tasks/sqlite_database_tasks'


Rails.application.load_tasks

namespace :db do
  task :create do
    ActiveRecord::Tasks::DatabaseTasks.create(config)
  end

  task :migrate do
    ActiveRecord::Tasks::DatabaseTasks.migrate(config)
  end

  task :seed do
    load File.join(Rails.root, 'db', 'seeds.rb')
  end

end

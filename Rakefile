require_relative "config/application"
require 'active_record/tasks/sqlite_database_tasks'

Rails.application.load_tasks

namespace :db do
  task :create do
    ActiveRecord::Tasks::DatabaseTasks.create(ActiveRecord::Base.configurations.configs_for('development').first)
  end
  
  task :migrate do
    ActiveRecord::Tasks::DatabaseTasks.migrate(ActiveRecord::Base.configurations.configs_for('development').first.configuration_hash)
  end

  task :seed do
    load File.join(Rails.root, 'db', 'seeds.rb')
  end
end

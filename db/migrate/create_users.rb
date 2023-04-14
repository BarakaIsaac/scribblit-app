class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      ## Database authenticatable
      t.string :username, null: false
      t.string :password_digest, null: false
      t.string :session_token, null: false

      t.timestamps null: false
    end

    add_index :users, :username, unique: true
    add_index :users, :session_token, unique: true
  end
end

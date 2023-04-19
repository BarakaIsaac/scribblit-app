require 'content_type_validator'

class CreateNotes < ActiveRecord::Migration[6.1]
  def change
    create_table :notes do |t|
      t.string :title
      t.text :body
      t.integer :author_id, null: false
      t.integer :notebook_id, null: false

      t.timestamps null: false
    end

    add_index :notes, :author_id
    add_index :notes, :notebook_id
  end
end

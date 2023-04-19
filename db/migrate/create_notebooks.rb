require 'content_type_validator'

class CreateNotebooks < ActiveRecord::Migration[6.1]
  def change
    create_table :notebooks do |t|
      t.string :title, null => false
      t.integer :author_id, null: false
      t.string :description

      t.timestamps null: false
  end

  add_index :notebooks, :author_id
  end
end

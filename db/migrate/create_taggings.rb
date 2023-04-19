require 'content_type_validator'

class CreateTaggings < ActiveRecord::Migration[6.1]
  def change
    create_table :taggings do |t|
      t.integer :note_id, null: false
      t.integer :tag_id, null: false

      t.timestamps null: false
    end

    add_index :taggings, :note_id
    add_index :taggings, :tag_id
  end
end

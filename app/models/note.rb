class Note < ActiveRecord::Base
  belongs_to :user,
  primary_key: :id,
  foreign_key: :author_id,
  class_name: "User"

  belongs_to :notebook,
  primary_key: :id,
  foreign_key: :notebook_id,
  class_name: "Notebook"

  has_many :taggings

  has_many :tags, through: :taggings, source: :tag

  validates :user, :notebook_id, presence: true
end

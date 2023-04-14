class Notebook < ActiveRecord::Base
  belongs_to :user,
  primary_key: :id,
  foreign_key: :author_id,
  class_name: 'User'

  has_many :notes,
  primary_key: :id,
  foreign_key: :notebook_id,
  class_name: 'Note',
  dependent: :destroy

  validates :title, :user, presence: true
end

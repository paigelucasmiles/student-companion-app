class Tag < ApplicationRecord
  belongs_to :entry
  belongs_to :topic
  # validates_uniqueness_of :topic_id, :scope => :entry_id
  # validates :name, uniqueness: true
end

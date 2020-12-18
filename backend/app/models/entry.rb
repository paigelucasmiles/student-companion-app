class Entry < ApplicationRecord
    has_many :tags
    has_many :topics, through: :tags
    # validates :name, uniqueness: true
    # validates :url, uniqueness: true
    # validates :kind, uniqueness: true
end

class Topic < ApplicationRecord
    has_many :tags
    has_many :entries, through: :tags
    # validates :name, uniqueness: true
end

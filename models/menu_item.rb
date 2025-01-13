class MenuItem < ApplicationRecord
    validates :name, :price, presence: true
end

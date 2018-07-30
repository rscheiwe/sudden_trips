class Review < ApplicationRecord
  has_many :comments
  
  belongs_to :suddentrip
end

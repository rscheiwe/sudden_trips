class Suddentrip < ApplicationRecord
  has_many :user_suddentrips
  has_many :users, through: :user_suddentrips
end

class User < ApplicationRecord
  has_many :user_suddentrips
  has_many :suddentrips, through: :user_suddentrips
end

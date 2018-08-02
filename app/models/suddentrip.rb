class Suddentrip < ApplicationRecord
  has_many :user_suddentrips
  has_many :users, through: :user_suddentrips
  validates :name, presence: true
  validates :location, presence: true
  validates :date, presence: true
end

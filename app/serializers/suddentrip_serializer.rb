class SuddentripSerializer < ActiveModel::Serializer
  attributes :id, :latitude, :longitude, :name, :location, :date, :rating, :visits, :destinations
  has_many :users
end

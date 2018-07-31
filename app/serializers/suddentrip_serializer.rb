class SuddentripSerializer < ActiveModel::Serializer
  attributes :id, :latitude, :longitude, :name, :location, :date, :rating, :destinations
  has_many :users
end

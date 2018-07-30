class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :likes
  has_one :suddentrip
end

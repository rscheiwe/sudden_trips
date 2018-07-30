class CommentSerializer < ActiveModel::Serializer
  attributes :id, :content
  has_one :review
end

class Static < ApplicationRecord
  def self.movie_search(search)
  	if search
  		where('title LIKE ?', "%#{search}%")
  	else
  		all
  	end
  end
end

class AddRatingToSuddentrips < ActiveRecord::Migration[5.2]
  def change
    add_column :suddentrips, :rating, :integer
  end
end

class AddLocationToSuddentrips < ActiveRecord::Migration[5.2]
  def change
    add_column :suddentrips, :location, :string
  end
end

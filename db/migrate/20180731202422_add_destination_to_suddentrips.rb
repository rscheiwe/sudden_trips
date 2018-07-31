class AddDestinationToSuddentrips < ActiveRecord::Migration[5.2]
  def change
    add_column :suddentrips, :destinations, :json
  end
end

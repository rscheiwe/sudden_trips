class AddVisitsToSuddentrips < ActiveRecord::Migration[5.2]
  def change
    add_column :suddentrips, :visits, :string
  end
end

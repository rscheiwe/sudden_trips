class AddDateToSuddentrips < ActiveRecord::Migration[5.2]
  def change
    add_column :suddentrips, :date, :string
  end
end

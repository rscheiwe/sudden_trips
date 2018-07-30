class CreateUserSuddentrips < ActiveRecord::Migration[5.2]
  def change
    create_table :user_suddentrips do |t|
      t.references :user, index: true
      t.references :suddentrip, index: true

      t.timestamps
    end
  end
end

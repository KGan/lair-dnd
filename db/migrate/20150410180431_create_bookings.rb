class CreateBookings < ActiveRecord::Migration
  def change
    create_table :bookings do |t|
      t.integer :listing_id
      t.integer :user_id
      t.datetime :dtstart
      t.datetime :dtend
      t.integer :guests

      t.timestamps null: false
    end
    add_index :bookings, :listing_id
    add_index :bookings, :user_id
  end
end

class AddMoreDetailsToListings < ActiveRecord::Migration
  def change
    create_table :amenities do |t|
      t.integer :listing_id
      t.boolean :internet
      t.boolean :tv
      t.boolean :kitchen
      t.boolean :dungeon
      t.boolean :moat
      t.boolean :secret_passages
      t.boolean :random_monsters
      t.boolean :endless_dungeons
      t.boolean :dragons
      t.boolean :maze
      t.boolean :treasure
      t.boolean :high_tower_room
      t.boolean :grand_library

      t.timestamps null: false
    end

    remove_column :listings, :internet
    remove_column :listings, :kitchen
    remove_column :listings, :tv
  end
end

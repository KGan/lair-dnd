class CreateLocationMappings < ActiveRecord::Migration
  def change
    create_table :location_mappings do |t|
      t.integer :listing_id
      t.integer :location_alias_id

      t.timestamps null: false
    end
    add_index :location_mappings, :listing_id
    add_index :location_mappings, :location_alias_id
  end
end

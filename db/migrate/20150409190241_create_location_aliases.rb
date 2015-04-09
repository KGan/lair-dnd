class CreateLocationAliases < ActiveRecord::Migration
  def change
    create_table :location_aliases do |t|
      t.integer :location_id
      t.string :name
      t.integer :area_id

      t.timestamps null: false
    end
    add_index :location_aliases, :location_id
    add_index :location_aliases, :area_id
  end
end

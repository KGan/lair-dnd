class CreateFeatureds < ActiveRecord::Migration
  def change
    create_table :featureds do |t|
      t.integer :location_id
      t.integer :score

      t.timestamps null: false
    end
    add_index :featureds, :location_id
  end
end

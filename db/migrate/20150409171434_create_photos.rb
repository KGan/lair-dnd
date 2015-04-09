class CreatePhotos < ActiveRecord::Migration
  def change
    create_table :photos do |t|
      t.integer :residence_id
      t.string :photourl
      t.boolean :verified

      t.timestamps null: false
    end
    add_index :photos, :residence_id
    add_index :photos, :verified
  end
end

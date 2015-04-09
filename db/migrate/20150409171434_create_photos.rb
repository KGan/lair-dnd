class CreatePhotos < ActiveRecord::Migration
  def change
    create_table :photos do |t|
      t.integer :listing_id, null:false
      t.integer :user_id, index: true
      t.string :photo_url, null: false
      t.string :thumb_url, null: false
      t.boolean :verified, null:false, default: false

      t.timestamps null: false
    end
    add_index :photos, :listing_id
    add_index :photos, :verified
  end
end

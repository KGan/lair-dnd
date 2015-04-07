class CreateListings < ActiveRecord::Migration
  def change
    create_table :listings do |t|
      t.integer :owner_id
      t.string :title
      t.string :tagline
      t.integer :accomodates
      t.integer :price
      t.integer :currency_id
      t.text :description
      t.text :rules

      t.timestamps null: false
    end
    add_index :listings, :owner_id
    add_index :listings, :currency_id
  end
end

class CreateReviews < ActiveRecord::Migration
  def change
    create_table :reviews do |t|
      t.string :comment
      t.integer :rating
      t.integer :listing_id, null:false, index:true
      t.integer :user_id, null:false, index:true

      t.timestamps null: false
    end
  end
end

class AddPendingToListings < ActiveRecord::Migration
  def change
    add_column :listings, :pending, :boolean, default: true, index:true
  end
end

class AddPendingToListings < ActiveRecord::Migration
  def change
    add_column :listings, :pending, :boolean, default: false, index:true
  end
end

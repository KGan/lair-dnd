class AddAvailabilityToListings < ActiveRecord::Migration
  def change
    add_column :listings, :minimum_stay, :integer
    add_column :listings, :availability_default, :boolean, index: true
  end
end

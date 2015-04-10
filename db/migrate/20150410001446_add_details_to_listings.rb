class AddDetailsToListings < ActiveRecord::Migration
  def change
    add_column :listings, :housing_type, :string
    add_column :listings, :bedrooms, :integer
    add_column :listings, :beds, :integer
    add_column :listings, :bathrooms, :integer
    add_column :listings, :internet, :boolean 
    add_column :listings, :kitchen, :boolean

    add_column :listings, :tv, :boolean
    add_column :listings, :checkin, :time 
    add_column :listings, :checkout, :time
  end
end

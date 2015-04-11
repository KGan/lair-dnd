class ChangeLatLngToDecimal < ActiveRecord::Migration
  def change
    change_column :locations, :latitude, :numeric
    change_column :locations, :longitude, :numeric
  end
end

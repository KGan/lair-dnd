class AddNameToFeatureds < ActiveRecord::Migration
  def change
    add_column :featureds, :name, :string
  end
end

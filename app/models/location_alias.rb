# == Schema Information
#
# Table name: location_aliases
#
#  id          :integer          not null, primary key
#  location_id :integer
#  name        :string
#  area_id     :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class LocationAlias < ActiveRecord::Base
  validates_presence_of :location, :name
  belongs_to :area, class_name: :LocationAlias, primary_key: :id, foreign_key: :area_id
  belongs_to :location
  has_many :location_mappings
end

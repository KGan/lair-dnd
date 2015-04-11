# == Schema Information
#
# Table name: locations
#
#  id         :integer          not null, primary key
#  longitude  :integer
#  latitude   :integer
#  size       :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Location < ActiveRecord::Base
  has_many :location_aliases
  validates_presence_of :longitude, :latitude, :size
  acts_as_mappable :lat_column_name => :latitude,
                   :lng_column_name => :longitude
end

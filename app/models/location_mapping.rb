# == Schema Information
#
# Table name: location_mappings
#
#  id                :integer          not null, primary key
#  listing_id        :integer
#  location_alias_id :integer
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#

class LocationMapping < ActiveRecord::Base
  belongs_to :listing
  belongs_to :location_alias
  validates_presence_of :listing, :location_alias
  validates :location_alias_id, uniqueness: { scope: :listing_id }
end

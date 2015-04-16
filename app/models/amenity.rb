# == Schema Information
#
# Table name: amenities
#
#  id               :integer          not null, primary key
#  listing_id       :integer
#  internet         :boolean
#  tv               :boolean
#  kitchen          :boolean
#  dungeon          :boolean
#  moat             :boolean
#  secret_passages  :boolean
#  random_monsters  :boolean
#  endless_dungeons :boolean
#  dragons          :boolean
#  maze             :boolean
#  treasure         :boolean
#  high_tower_room  :boolean
#  grand_library    :boolean
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#

class Amenity < ActiveRecord::Base
  belongs_to :listing
  validates_presence_of :listing

end

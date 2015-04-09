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

require 'test_helper'

class LocationMappingTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end

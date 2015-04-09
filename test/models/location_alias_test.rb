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

require 'test_helper'

class LocationAliasTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end

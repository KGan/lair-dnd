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

require 'test_helper'

class LocationTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end

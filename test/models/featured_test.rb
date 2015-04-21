# == Schema Information
#
# Table name: featureds
#
#  id          :integer          not null, primary key
#  location_id :integer
#  score       :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  name        :string
#

require 'test_helper'

class FeaturedTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end

# == Schema Information
#
# Table name: bookings
#
#  id         :integer          not null, primary key
#  listing_id :integer
#  user_id    :integer
#  dtstart    :datetime
#  dtend      :datetime
#  guests     :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'test_helper'

class BookingTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end

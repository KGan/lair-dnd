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

class Booking < ActiveRecord::Base



  def overlap?(other)
    return (other.dtstart < self.dtend && self.dtstart < other.dtend)
  end
end

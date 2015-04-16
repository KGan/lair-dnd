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
  validates_presence_of :dtstart, :dtend, :guests, :user, :listing
  validate :no_conflict
  validate :interval_sensibility
  belongs_to :listing
  belongs_to :user


  def overlap?(other)
    return (other.dtstart < self.dtend && self.dtstart < other.dtend)
  end

  def no_conflict
    siblings = Booking.where(listing_id: self.listing_id)
    if siblings.exists?(["dtstart < :end2 AND dtend > :start2", start2: self.dtstart, end2: self.dtend])
      #not using overlap so we don't n+1 query or do too much work in ruby.
      errors.add(:booking_conflict, "Invalid booking due to conflict")
    end
  end

  def interval_sensibility
    errors.add(:date_range, 'Invalid date range (start after end)') if self.dtstart > self.dtend
  end
end

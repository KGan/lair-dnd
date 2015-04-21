# == Schema Information
#
# Table name: reviews
#
#  id         :integer          not null, primary key
#  comment    :string
#  rating     :integer
#  listing_id :integer          not null
#  user_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Review < ActiveRecord::Base
  validates_presence_of :listing, :user, :comment, :rating
  #validate :stayed_at_before
  belongs_to :listing
  belongs_to :user


  def stayed_at_before
    errors.add(:not_valid, 'you have not stayed at this listing before') unless self.user.stayed_at?(self.listing)
  end
end

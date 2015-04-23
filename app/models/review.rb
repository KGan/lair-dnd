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
  validates_uniqueness_of :listing_id, scope: :user_id
  validates :rating, inclusion: {in: (0..5).to_a}
  validate :stayed_at_before
  belongs_to :listing
  belongs_to :user


  def stayed_at_before
    errors.add(:not_valid, 'you have not stayed at this listing before') unless self.user.stayed_at?(self.listing) || self.user.functional_privileges? 
  end
end

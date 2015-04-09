# == Schema Information
#
# Table name: photos
#
#  id         :integer          not null, primary key
#  listing_id :integer          not null
#  user_id    :integer
#  photo_url  :string           not null
#  thumb_url  :string           not null
#  verified   :boolean          default(FALSE), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  main       :boolean
#

class Photo < ActiveRecord::Base
  belongs_to :user
  belongs_to :listing
  validates_presence_of :listing, :user, :photo_url, :thumb_url
end


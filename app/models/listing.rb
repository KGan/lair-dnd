# == Schema Information
#
# Table name: listings
#
#  id          :integer          not null, primary key
#  owner_id    :integer
#  title       :string
#  tagline     :string
#  accomodates :integer
#  price       :integer
#  currency_id :integer
#  description :text
#  rules       :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Listing < ActiveRecord::Base
  belongs_to :user, class_name: 'User', primary_key: :id, foreign_key: :owner_id
  validates_presence_of :user, :title, :accomodates, :price, :description


  def is_owner?(u)
    !!(u.id == self.owner_id)
  end
end

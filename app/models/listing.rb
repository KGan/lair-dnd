# == Schema Information
#
# Table name: listings
#
#  id                   :integer          not null, primary key
#  owner_id             :integer
#  title                :string
#  tagline              :string
#  accomodates          :integer
#  price                :integer
#  currency_id          :integer
#  description          :text
#  rules                :text
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  minimum_stay         :integer
#  availability_default :boolean
#  housing_type         :string
#  bedrooms             :integer
#  beds                 :integer
#  bathrooms            :integer
#  internet             :boolean
#  kitchen              :boolean
#  tv                   :boolean
#  checkin              :time
#  checkout             :time
#

class Listing < ActiveRecord::Base
  TYPES = ['house', 'apartment', 'room', 'studio']
  belongs_to :user, class_name: 'User', primary_key: :id, foreign_key: :owner_id
  validates_presence_of :user, :title, :accomodates, :price, :description
  validates :housing_type, inclusion: {in: TYPES}
  has_many :photos
  has_one :location_mapping
  has_one :location_alias, through: :location_mapping
  def is_owner?(u)
    !!(u.id == self.owner_id)
  end

  def main_photo
    return unless self.photos
    a = self.photos.where(:main => true).first
    a ? a : self.photos.first
  end

  def amenities
    [].tap do |arr|
      self.class.columns_hash.each do |k,v|
        arr << k if v.type == :boolean && k != 'availability_default'
      end
    end
  end
end

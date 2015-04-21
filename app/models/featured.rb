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

class Featured < ActiveRecord::Base
  belongs_to :location
  validates_presence_of :location

  def self.calculate
    # self.destroy_all

  end
end

class Featured < ActiveRecord::Base
  belongs_to :location
  validates_presence_of :location

  def self.calculate
    # self.destroy_all

  end
end

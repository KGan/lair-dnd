# == Schema Information
#
# Table name: sessions
#
#  id            :integer          not null, primary key
#  user_id       :integer
#  session_token :string
#  ua_info       :string
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class Session < ActiveRecord::Base
  belongs_to :user
  validates_uniqueness_of :session_token
  validates_presence_of :user
end

# == Schema Information
#
# Table name: sessions
#
#  id            :integer          not null, primary key
#  user_id       :integer
#  session_token :string
#  ua_info       :string
#  remote_ip     :string
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

require 'test_helper'

class SessionTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end

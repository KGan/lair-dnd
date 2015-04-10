# == Schema Information
#
# Table name: users
#
#  id               :integer          not null, primary key
#  username         :string
#  email            :string
#  password_digest  :string
#  guest            :boolean
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  profile_photo_id :integer
#

require 'test_helper'

class UserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end

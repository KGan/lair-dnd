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
  validates_presence_of :user, :session_token
  before_save :ensure_token

  def ensure_token
    self.session_token ||= Session.generate_token
  end


  def reset_token!
    self.session_token = Session.generate_token
  end

  def self.session_exists?(rip)
    !!(self.find_by_remote_ip(rip))
  end

  def self.generate_token
    begin
      token = SecureRandom.urlsafe_base64
    end while Session.find_by_session_token(token)
    token
  end

  def process(req)
  end
end

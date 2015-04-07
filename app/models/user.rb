# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string
#  email           :string
#  password_digest :string
#  guest           :boolean
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ActiveRecord::Base
  has_many :identities
  has_many :sessions
  validates_presence_of :username, :email, :password_digest
  validates_uniqueness_of :email, :username
  validates :password, length: {minimum: 7, allow_nil: true}
  attr_reader :password

  def self.find_by_credentials(info)
    u = self.find_by_username(info.username)
    (u && u.verifyPassword(info.password) ) ? u : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
    password
  end

  def verifyPassword(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end
end

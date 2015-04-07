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
  validates_presence_of :email, :password_digest
  validates_uniqueness_of :email
  validates_uniqueness_of :username, :allow_nil => true, :allow_blank => true
  validates :password, length: {minimum: 7, allow_nil: true}
  attr_reader :password

  def self.find_by_credentials(info)
    u = self.find_by_email(info['email'])
    (u && u.verifyPassword(info['password']) ) ? u : nil
  end

  def self.find_by_session(token)
    Session.find_by_session_token(token).try(:user)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
    password
  end

  def verifyPassword(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def create_or_update_session(req = nil)
    if self.sessions.session_exists?(req.remote_ip)
      self.sessions.where(remote_ip: req.remote_ip).reset_token!
    else
      create_session(req)
    end
  end

  def destroy_session(token)
    sess = self.sessions.find_by_session_token(token)
    if sess
      sess.destroy
      true
    else
      false
    end
  end

  def create_session(req = nil)
    if self.sessions.length > 4
      self.sessions.order(:created_at).first.destroy
    end
    token = Session.generate_token
    session = self.sessions.create(session_token: token)
    session.process(req) if req
    token
  end

  def find_session(id)
    self.sessions.find(id)
  end

  def ensure_session
    if self.sessions.length < 1
     create_session
    end
  end

end

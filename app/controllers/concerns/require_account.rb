module RequireAccount
  extend ActiveSupport::Concern

  included do
    before_action :require_login!
  end

  def require_login!
    redirect_to new_session_url unless signed_in?
  end
end

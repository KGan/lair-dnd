module RequireAccount
  extend ActiveSupport::Concern

  included do
    before_action :require_login!
  end

  def require_login!
    render json: {errors: 'login required'}, status: 403 and return unless signed_in?
  end
end

class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  helper_method :current_user, :signed_in?

  def current_user
    @current_user ||= User.find_by_session(session[:session_token])
  end

  def signed_in?
    !!current_user
  end

  def signout!
    current_user.destroy_session(session[:session_token])
    session[:session_token] = nil
  end

  def signin(user)
    @current_user = user
    session[:session_token] = @current_user.create_or_update_session(request)
  end
end

class SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(session_params)
    if @user
      signin(user)
      redirect_to root_url
    else
      flash[:errors] = ["Couldn't find account for #{session_params.email}"]
  end

  def destroy
    signout!
    redirect_to root_url
  end

  def destroy_all
    current_user.sessions.destroy
    redirect_to root_url
  end

  def destroy_one
    @sess = current_user.find_session(params[:id])
    @sess.destroy if @sess
    render json: @sess
  end
end

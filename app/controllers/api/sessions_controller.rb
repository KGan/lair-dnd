class Api::UsersController < ApplicationController

  def create
    @user = User.find_by_credentials(session_params)
    if @user
      signin(@user)
      render :show
    else
      flash[:errors] = ["Couldn't find account for #{session_params['email']}"]
      render json: flash[:errors], status: 403
    end
  end

  def destroy
    render json: 'pending', status: 403
  end

  private
    def user_params
      params.require(:user).permit(:email, :password)
    end
end

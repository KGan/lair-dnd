class Api::SessionsController < ApplicationController

  def create
    @user = User.find_by_credentials(session_params)
    if @user
      signin(@user)
      render 'api/users/show'
    else
      render json: {error: ["Could not authenticate user #{session_params['email']}"]}, status: 403
    end
  end

  def destroy
    render json: 'pending', status: 403
  end

  private
    def session_params
      params.permit(:email, :password)
    end
end

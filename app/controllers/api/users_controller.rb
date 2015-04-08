class Api::UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
    render :show
  end

  def create
    @user = User.new(user_params)
    if @user.save
      render :show
    else
      render json: {errors: @user.errors.full_messages}, status: 422
    end
  end

  private
    def user_params
      params.permit(:email, :password)
    end
end

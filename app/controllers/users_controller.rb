class UsersController < ApplicationController
  include Resourceable
  def create
    @user = User.new(user_params)
    if @user.save
      redirect_to root_url
    else
      flash[:errors] = @user.errors.full_messages
      redirect_to :back
    end
  end

  def new
    @user = User.new
  end

  def edit
  end

  def show
  end

  def destroy
    if @user
      @user.destroy
      render json: 'user/show'
    else
      flash[:errors] = ['user not found']
      redirect_to :back
    end
  end

  def update
    if @user.update(user_params)
      redirect_to root_url
    else
      flash[:errors] = @user.errors.full_messages
      redirect_to :back
    end
  end

  def index
    if query_params
      @users = User.search_by(query_params)
    else
      @users = User.all
    end
    render json: 'users/index', status: 200
  end
end

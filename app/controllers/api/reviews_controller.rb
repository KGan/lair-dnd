class Api::ReviewsController < Api::ApiController
  skip_before_action :require_login!, only: [:show, :index]
  def index
    @reviews = Review.where(listing_id: params[:listing_id])
    if @reviews
      render :index
    else
      render json: {errors: 'nothing found'}, status: 422
    end
  end

  def create
    @review = Review.new(review_params)
    if @review.save
      render :show
    else
      render json: @review.errors, status: 422
    end
  end

  def new
    @review = Review.new
  end

  def destroy
    @review = Review.find(params[:id])
    if @review
      @review.destroy
      render :show
    else
      render json: {errors: 'not found'}, status: 422
    end
  end
  
  def show
    @review = Review.find(params[:id])
    render :show
  end

  def update
  end

  private
    def review_params
      params.require(:review).permit(:rating, :comment, :listing_id).merge({user_id: current_user.id})
    end
end

class Api::BookingsController < Api::ApiController
  skip_before_action :require_login!, only: [:show, :index]

  def create
    @booking = Booking.new(booking_params)
    if @booking.save
      render :show
    else
      render json: @booking.errors.full_messages, status: 422
    end
  end

  def show
    @booking = Booking.find(params[:id])
  end

  def index
  end

  def destroy
    @booking = Booking.find(params[:id])
    @booking.try(:destroy)
    render :show
  end

  private
    def booking_params
      params.require(:booking).permit(:listing_id, :dtstart, :dtend, :guests)
    end
end

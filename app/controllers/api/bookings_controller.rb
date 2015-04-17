class Api::BookingsController < Api::ApiController
  skip_before_action :require_login!, only: [:show, :index]

  def create
    @booking = Booking.new(booking_params.merge({user_id: current_user.id}))
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
      p = params.require(:booking).permit(:listing_id, :dtstart, :dtend, :guests)
      [:dtstart, :dtend].each do |datev|
        unless p[datev] && p[datev].is_a?(DateTime)
          p[datev] = DateTime.parse(p[datev])
        end
      end
      p
    end
end

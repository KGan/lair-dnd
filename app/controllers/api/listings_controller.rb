class Api::ListingsController < Api::ApiController
  skip_before_action :require_login!, only:[ :show]

  def create
    @listing = current_user.listings.create(parse_listings)
    if @listing.save
      render :show
    else
      render json: {errors: @listing.errors.full_messages}, status: 422
    end
  end

  def index
      @listings = Listing.all.first(20)
      render :index
  end

  def update
    @listing = Listing.find(params[:id])
    if @listing.update(parse_listings)
      render :show
    else
      render json: {errors: @listing.errors.full_messages }, status: 422
    end
  end

  def show
    @listing = Listing.includes(Listing.reflections.keys.map(&:to_sym)).find(params[:id])
    unless @listing
      render json: ['no listing found'], status: 403
    end
  end




  private

    def listing_params
      params.require(:listing).
             permit(:title, :tagline, :accomodates,
                    :price, :currency_id, :description,
                    :rules, :availability_default, :minimum_stay
                   )
    end

    def parse_listings
      fpfile_data = params.require(:listing).permit(:fpfiles)
      if fpfile_data
        #TODO
        puts 'i have data'
      end

      listing_params
    end

    def search
      Listing.search(search_params)
    end

    def search_params
      params.require(:search).permit(:offset, :location)
    end
end

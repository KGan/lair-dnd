class Api::ListingsController < Api::ApiController

  def index
    @listings = Listing.all if (@listings = search)
    render :index
  end

  def create
    @listing = current_user.listings.create(parse_listings)
    if @listing.save
      render :show
    else
      render json: @listing.errors.full_messages, status: 422
    end
  end

  def update
    @listing = Listing.find(params[:id])
    if @listing.update(parse_listings)
      render :show
    else
      render json: @listing.errors.full_messages, status: 422
    end
  end

  def show
    @listing = Listing.include(*Listing.reflections).find(params[:id])
    unless @listing
      render json: ['no listing found'], status: 403
    end
  end




  private
    def search
    end

    def search_params
      params.require(:search).permit()
    end

    def listing_params
      params.require(:listing).
             permit(:title, :tagline, :accomodates,
                    :price, :currency_id, :description,
                    :rules)
    end

    def parse_listings
      fpfile_data = params.require(:listing).permit(:fpfiles)
      if fpfile_data
        #TODO
        puts 'i have data'
      end

      listing_params
    end
end

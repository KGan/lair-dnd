class Api::ListingsController < Api::ApiController
  skip_before_action :require_login!, only:[ :show, :index]

  def new
    @s3_direct_post = S3_BUCKET.presigned_post(key: "uploads/#{SecureRandom.uuid}/${filename}", success_action_status: 201, acl: :public_read)
    @listing = Listing.new
    @attributes = Listing.parsed_columns
    render 'listings/new'
  end

  def create
    @listing = current_user.listings.create(parse_listings)
    if @listing.save
      render :show
    else
      render json: {errors: @listing.errors.full_messages}, status: 422
    end
  end

  def index
    @listings = Listing.all.first(20) unless (@listings = search)
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
      params.require(:listing).permit(*Listing.column_names.map(&:to_sym))
    end

    def parse_listings
      fpfile_data = params.require(:listing).permit(:photos => [])
      if fpfile_data
        #TODO handle uploaded files
      end

      listing_params
    end

    def search
      Listing.search(search_params)
    end

    def search_params
      params.permit(:search => [:checkin, :checkout, :accomodates, :location => []])
    end
end

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
    def extract_amenities
      amenities_included = params.require(:amenity).permit(*Listing.parsed_columns[:amenities].map(&:to_sym))
      amenity_params = amenities_included.map do |k,v|
        {k => v}
      end
      @amenity = Amenity.new(*amenity_params)
      if !@amenity.save
        render json: @amenity.errors.full_messages, status: 422
        return
      end
    end

    def listing_params
      params.require(:listing).permit(*Listing.parsed_columns[:complete].map(&:to_sym))
    end

    def parse_listings
      extract_amenities 

      listing_params
    end

    def search
      Listing.search(search_params)
    end

    def search_params
      params.permit(:search => [:range, :checkin, :checkout, :accomodates, :location => []])
    end
end

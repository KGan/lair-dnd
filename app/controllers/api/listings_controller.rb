class Api::ListingsController < Api::ApiController
  skip_before_action :require_login!, only:[ :show, :index]

  def new
    @s3_direct_post = S3_BUCKET.presigned_post(key: "uploads/#{SecureRandom.uuid}/${filename}", success_action_status: 201, acl: :public_read)
    @listing = Listing.new
    @attributes = Listing.parsed_columns
    render 'listings/new'
  end

  def create
    @listing = current_user.listings.create(listing_params)
    if @listing.save
      parse_listings
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
    if !@listing || (@listing.pending && (!signed_in? || (current_user.id != @listing.owner_id)))
      render json: {errors: 'not found'}, status: 404 
    end
  end




  private
    def extract_amenities
      amenities_included = params.permit(:amenity => Listing.parsed_columns[:amenities].map(&:to_sym))
      return unless amenities_included[:amenity]
      amenity_params = amenities_included[:amenity].map do |k,v|
        [k, true]
      end
      @amenity = Amenity.new(Hash[amenity_params])
      @amenity.listing_id = @listing.id
      if !@amenity.save
        render json: @amenity.errors.full_messages, status: 422
        return
      end
    end

    def extract_location 
      loc_params = params.permit(:search => [:name, :location => []])[:search]
      if loc_params
        @location = Location.new(
          latitude: loc_params[:location][0], 
          longitude: loc_params[:location][1],
          size: 10
        )
        if !@location.save
          render json: @location.errors.full_messages, status: 422
          return
        end
        @location_alias = LocationAlias.create(location_id: @location.id, name: loc_params[:name])
        @listing.location_alias = @location_alias
      end
    end

    def listing_params
      params.require(:listing).permit(*Listing.parsed_columns[:complete].map(&:to_sym))
    end

    def parse_listings
      extract_amenities
      extract_location
    end

    def search
      Listing.search(search_params, current_user ? current_user.id : nil)
    end

    def search_params
      params.permit(:search => [:range, :checkin, :checkout, :accomodates, :location => []])
    end
end

class ListingsController < ApplicationController
  def show
    @listing = Listing.find(params[:id])
    if !@listing || (@listing.pending && (!signed_in? || (current_user.id != @listing.owner_id)))
      render json: {errors: 'not found'}, status: 404 
    end
       
    @amenities = @listing.amenity
    @amenity_names = [].tap do |arr|
      @amenities.class.columns_hash.each do |k,v|
        arr << k if v.type == :boolean
      end
    end
  end

  def index
    render :index
  end

  def new
    @listing = Listing.new
  end

  private
end

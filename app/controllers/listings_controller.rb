class ListingsController < ApplicationController
  def show
    @listing = Listing.find(params[:id])
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
  end

  private
end

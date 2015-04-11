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
    @listings = Listing.all.first(20) if (@listings = search)
    render :index
  end

  private
    def search
      Listing.search(search_params)
    end

    def search_params
      params.require(:search).permit(:offset, :location)
    end
end

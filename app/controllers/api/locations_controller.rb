class Api::LocationsController < ApplicationController
  
  def featured
    @featureds = Featured.includes(:location).all
    render 'locations/featureds'
  end

  def show
    render json: Location.first, status: 200
  end
end

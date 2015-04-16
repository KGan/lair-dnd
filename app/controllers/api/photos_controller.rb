module Api
  class PhotosController < ApiController
    skip_before_action :require_login!, only: [:show]
    def show
      @photo = Photo.find(params[:id])
    end
    
    def create
      @photo = current_user.photos.create(photo_params)
      if @photo.save
        render :show
      else
        render json: {errors: @photo.errors.full_messages}, status: 422
      end
    end

    private
      def photo_params
        params.permit(:photo_url, :thumb_url, :listing_id)
      end
      
  end
end


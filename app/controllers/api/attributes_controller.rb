class Api::AttributesController < ApplicationController
  def attribute_list
    modelname = params[:modelname]
    if (modelname == 'listing')
      render json: {form_attrs: modelname.classify.constantize.parsed_columns}
    else
      render status: 403
    end
  end


  private

end

class Api::AttributesController < ApplicationController
  def attribute_list
    modelname = params[:modelname]
    columns = modelname.classify.constantize.column_names
    render json: {form_attrs: parse_columns(columns)}
  end


  private
    def parse_columns(cols)
      cols - ['id', 'created_at', 'updated_at', 'password_digest']
    end
end

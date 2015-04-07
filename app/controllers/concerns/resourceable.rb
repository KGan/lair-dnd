module Resourceable
  extend ActiveSupport::Concern

  included do
    before_action :load_resource, only: [:edit, :destroy, :show, :update]
  end

  def load_resource
    self.instance_variable_set("@{self.controller_name.singularize}", self.controller_name.classify.constantize.find(params[:id]))
  end

end

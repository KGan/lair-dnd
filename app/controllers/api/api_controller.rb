module Api
  class ApiController < ApplicationController
    include RequireAccount
    skip_before_action :require_login!, only: [:create]
  end
end

module Api
  class ApiController < ApplicationController
    include RequireAccount
  end
end

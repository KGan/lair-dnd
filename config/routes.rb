Rails.application.routes.draw do

  root 'root#root'

  resources :users
  resources :sessions, only: [:new, :create, :destroy]

  namespace :api, defaults: { format: :json } do
    resources :listings
    resources :users, only: [:show]
  end

end

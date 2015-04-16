Rails.application.routes.draw do

  root 'root#root'

  resources :users, except: [:new]
  resources :sessions, only: [:create, :destroy]
  resources :listings, only: [:new, :show, :index]

  namespace :api, defaults: { format: :json } do
    resources :listings
    resources :users, only: [:show, :create, :destroy]
    resources :sessions, only: [:create, :destroy]
    get 'attrs/:modelname', to: 'attributes#attribute_list'
    resources :bookings, only: [:show, :create, :index, :destroy]
  end

end

Rails.application.routes.draw do

  root 'root#root'

  resources :users
  resources :sessions, only: [:new, :create, :destroy]


end

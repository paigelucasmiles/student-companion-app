Rails.application.routes.draw do
  resources :tags, only: [:index, :show, :create, :destroy]
  resources :topics, only: [:index, :show, :create, :destroy]
  resources :entries, only: [:index, :show, :create, :destroy]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end

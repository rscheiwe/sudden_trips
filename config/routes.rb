Rails.application.routes.draw do

  # resources :comments
  # resources :reviews
  namespace :api do
    namespace :v1 do
      resources :users, except: [:new, :edit]
      resources :suddentrips, except: [:new, :edit]

    end
  end
# get '*other', to: "static#index"

end
